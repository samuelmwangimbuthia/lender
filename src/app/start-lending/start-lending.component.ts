import { Component, EventEmitter, OnInit, Output } from "@angular/core";
//to populate data for editing
import { LenderOrBorrowersService } from "../lendersOrBorrowers.service";
import { LendersOrBorrowers } from "../ILendersOrBorrowers";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
} from "@angular/forms";

//reading the route parameters
import { ActivatedRoute, Router } from "@angular/router";

// check if the value of the email input equals that of email confirmation input

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email");
  const confirmEmail = c.get("confirmEmail");
  if (emailControl.pristine || confirmEmail.pristine) {
    return null;
  }
  if (emailControl.value === confirmEmail.value) {
    return null;
  }
  return { match: true };
}

//validation for loan limit, check the least amount and highest amount one can borrow
// TO DO: add credit rating

function lendingAmount(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: "app-start-lending",
  templateUrl: "./start-lending.component.html",
  styleUrls: ["./start-lending.component.css"],
})
export class StartLendingComponent implements OnInit {
  // linking the child component to the parent
  @Output() sendLenderData: EventEmitter<{}> = new EventEmitter<{}>();
  // @Output() displayMessage: EventEmitter<{}> = new EventEmitter<{}>();

  onboardingFormGroup: FormGroup;

  //create a property for the titleDeed array in form Model

  get titleDeeds(): FormArray {
    return <FormArray>this.onboardingFormGroup.get("titleDeeds");
  }

  user;
  action;

  constructor(
    private fb: FormBuilder,
    private lender: LenderOrBorrowersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //set controls for all onboarding form input fields
    this.onboardingFormGroup = this.fb.group({
      first_name: ["", [Validators.required, Validators.minLength(1)]],
      last_name: ["", [Validators.required, Validators.minLength(1)]],
      phoneNumber: null,
      emailGroup: this.fb.group(
        {
          email: ["", [Validators.required, Validators.email]],
          confirmEmail: ["", [Validators.required, Validators.email]],
        },
        { Validator: emailMatcher }
      ),
      amount: [null, lendingAmount(1000, 50000)], //TO DO: Set the minimum and maximum based on credit rating
      collateral: "logbook",
      vehicleRegistrationNumber: "",
      titleDeeds: this.fb.array([this.addTitleDeed()]), //hold multiple instances of the addTitleDeed method
    });
    //watch and react to the selected collacteral
    this.onboardingFormGroup
      .get("collateral")
      .valueChanges.subscribe((value) => this.selectCollateral(value));

    //this.populateLendersData();
    this.getUser();
  }

  //the method shall be reused by the borrower and lender component to prepopulate the form with
  getUser(): void {
    let id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    if (id !== null) {
      this.lender.getUser(id).subscribe((user1) => {
        //console.log(user1)
        this.populateLendersData1(user1);
      });
    }
    /* if(id===null){
      let p = this.initializeUser();
      console.log(p);

    }else {
    this.lender.getUser(id).subscribe((user1)=>{
    //console.log(user1)
      this.populateLendersData1(user1)
    })
  } */
  }
  //with the saved data
  populateLendersData1(user1) {
    let user = user1;
    console.log(user);
    this.onboardingFormGroup.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      phoneNumber: user.id,
      collateral: "",
    });
    this.user = user1;
    console.log(user);
  }

  //Return an initialized object
  private initializeUser(): LendersOrBorrowers {
    return {
      id: 0,
      first_name: null,
      last_name: null,
      avatar: null,
      email: null,
    };
  }

  //update existing lender
  // TO DO FIX :not properly reading the condition for id hence the else block is executed for post and put
  editUser(): void {
    if (this.onboardingFormGroup.dirty) {
      //let id = this.route.snapshot.paramMap.get('id');
      //console.log(id +'is the id ' + typeof(id))
      const u = { ...this.user, ...this.onboardingFormGroup.value };
      console.log(this.user);
      // console.log(this.onboardingFormGroup.value)
      console.log(u);

      if (u.id === undefined) {
        const s = this.initializeUser();
        const p = { ...s, ...u }; // copy over the values from the form and overwrite any changed values
        this.lender.createUser(p).subscribe({
          next: () => {
            this.onSaveComplete('new user');
            console.log(p)
          },
        });
      } else {
        this.lender.updateUser(u).subscribe({
          next: () => {
            this.onSaveComplete('update');

          },
        });
      }
    }
  }
  // TO DO: id is undefined
  deleteUser(): void {
    // let id = +this.route.snapshot.paramMap.get("id");
    console.log(this.user._id);
    this.lender
      .deleteUser(this.user._id)
      .subscribe(() => this.onSaveComplete('delete'));
  }
  // defines what happens on successiful post put and delete operations
  onSaveComplete(action: String): void {
    this.onboardingFormGroup.reset();
     // console.log('this is an update')
     // this.displayMessage.emit(action); //to display the appropriate message
     this.action = action

    //this.router.navigate(["/messages"]); //Display success message
  }

  //Save and send newly created lender data to the parent component (market place)
  createNewLender(data) {
    let id = +this.route.snapshot.paramMap.get("id");
    console.log(id);
    //this.sendLenderData.emit(data);
  }

  // sets validators for the selected button
  selectCollateral(security: string): void {
    //const collateralControl = this.onboardingFormGroup.get("collateral");
    //TO DO Fix getting reference to the controls in the array group
    const vehicleRegistrationNumber = this.onboardingFormGroup.get(
      "vehicleRegistrationNumber"
    );
    const landRegistrationNumber = this.onboardingFormGroup.get(
      "titleDeed[i].landRegistrationNumber"
    );
    if (security === "logbook") {
      vehicleRegistrationNumber.setValidators(Validators.required);
    } else if (security === "titleDeed") {
      landRegistrationNumber.setValidators(Validators.required);
    } else {
      vehicleRegistrationNumber.clearValidators();
      landRegistrationNumber.clearValidators();
    }
    vehicleRegistrationNumber.updateValueAndValidity();
    landRegistrationNumber.updateValueAndValidity();
  }
  //Duplicate the input element when addAnotherTitle button is clicked
  buildTitleDeed(): void {
    this.titleDeeds.push(this.addTitleDeed());
  }
  //create an additional title deed fields
  // TO DO: add other motor vehicles as security
  addTitleDeed(): FormGroup {
    return this.fb.group({
      landRegistrationNumber: "",
      landSize: "",
      landOwnerName: "",
      identificationNumber: "",
    });
  }
}
