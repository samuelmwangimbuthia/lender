import { Component, EventEmitter, OnInit, Output } from "@angular/core";
//to populate data for editing
import { LenderOrBorrowersService } from "../lendersOrBorrowers.service";
import {LendersOrBorrowers} from "../ILendersOrBorrowers"
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

//reading the route parameters
import{ActivatedRoute} from '@angular/router';

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
  onboardingFormGroup: FormGroup;

  //create a property for the titleDeed array in form Model

  get titleDeeds(): FormArray{
    return <FormArray> this.onboardingFormGroup.get('titleDeeds')
  }


user:LendersOrBorrowers
  constructor(private fb: FormBuilder, private lender: LenderOrBorrowersService, private route: ActivatedRoute,) {}

  ngOnInit() {
    //set controls for all onboarding form input fields
    this.onboardingFormGroup = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(1)]],
      lastName: ["", [Validators.required, Validators.minLength(1)]],
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
      titleDeeds: this.fb.array([this.addTitleDeed()]) //hold multiple instances of the addTitleDeed method
    });
    //watch and react to the selected collacteral
    this.onboardingFormGroup
      .get("collateral")
      .valueChanges.subscribe((value) => this.selectCollateral(value));

    //this.populateLendersData();
    this.getUser()
  }

  //the method shall be reused by the borrower and lender component to prepopulate the form with
  getUser():void{
     let id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    if(id===0){
      //this.initializeUser();
    }else {
    this.lender.getUser(id).subscribe((user1)=>{
    //console.log(user1)
      this.populateLendersData1(user1)
    })
  }

  }
  //with the saved data
populateLendersData1(user1){
  let user =user1.data
  this.onboardingFormGroup.patchValue({
    firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.id,
      collateral: ''
  })
  console.log(user.email)
}

//Return an initialized object
// private initializeUser(){
//   this.onboardingFormGroup.patchValue({
//     firstName: 'Emmanuel',
//       lastName: 'Mbuthia',
//       phoneNumber: 729782466,
//       email: 'mbuthia.jsamuel@gmail.com',
//       confirmEmail: 'mbuthia.jsamuel@gmail.com',
//       collateral: ''
//   })
// }


  /*createNewLender(data){
  console.log(data)
} */
  //update existing lender
  // TO DO FIX :not properly reading the condition for id hence the else block is executed for post and put
  editUser():void{

    if(this.onboardingFormGroup.dirty){
    //   let id = +this.route.snapshot.paramMap.get('id');
    // console.log(id +'is the id ' + typeof(id))
      const u ={...this.user, ...this.onboardingFormGroup.value};

      if(u.id === 0){
        //this.initializeUser();//not working
        this.lender.createUser(u).subscribe(
          (u) => console.log(u),
        )
      }else {
        this.lender.updateUser(u).subscribe({
          next: ()=> console.log(u.id)
          // next: ()=>{this.onSaveComplete()}

        }
        )
      }
    }
  }
// TO DO: id is undefined
  deleteUser():void{
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.lender.deleteUser(this.user.id).subscribe(
      ()=> console.log('item deleted')
    )
  }

  onSaveComplete():void{
    this.onboardingFormGroup.reset();
  }

  //TO DO: Save lender data
  createNewLender(data) {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.sendLenderData.emit(data);
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
  buildTitleDeed(): void{
    this.titleDeeds.push(this.addTitleDeed())
  }
  //create an additional title deed fields
  // TO DO: add other motor vehicles as security
  addTitleDeed():FormGroup {
    return this.fb.group({
      landRegistrationNumber: "",
      landSize:'',
      landOwnerName:'',
      identificationNumber:''
    })
  }
}
