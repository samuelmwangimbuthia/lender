import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from "@angular/forms";

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
    return <FormArray> this.onboardingFormGroup.get('titleDeed')
  }
  constructor(private fb: FormBuilder) {}

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
  }

  //the method shall be reused by the borrower and lender component to prepopulate the form with
  /* with the saved data
populateLendersData(){
  this.onboardingFormGroup.patchValue({
    firstName: 'Emmanuel',
      lastName: 'Mbuthia',
      phoneNumber: 729782466,
      email: 'mbuthia.jsamuel@gmail.com',
      collateral: ''
  })
}
*/
  /*createNewLender(data){
  console.log(data)
} */

  //TO DO: Save lender data
  createNewLender(data) {
    this.sendLenderData.emit(data);
  }

  // sets validators for the selected button
  selectCollateral(security: string): void {
    //const collateralControl = this.onboardingFormGroup.get("collateral");
    const vehicleRegistrationNumber = this.onboardingFormGroup.get(
      "vehicleRegistrationNumber"
    );
    const landRegistrationNumber = this.onboardingFormGroup.get(
      "landRegistrationNumber"
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
