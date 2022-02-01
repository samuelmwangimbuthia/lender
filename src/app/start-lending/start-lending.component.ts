import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-start-lending',
  templateUrl: './start-lending.component.html',
  styleUrls: ['./start-lending.component.css']
})
export class StartLendingComponent implements OnInit {
  // linking the child component to the parent
  @Output() sendLenderData: EventEmitter<{}> = new EventEmitter<{}>()
  onboardingFormGroup: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    //set controls for all onboarding form input fields
    this.onboardingFormGroup = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(1)]],
      lastName: ['',[Validators.required, Validators.minLength(1)]],
      phoneNumber: Number,
      email: ['', [Validators.required, Validators.email]],
      amount: Number,
      collateral: ''
    })

    //this.onboardingFormGroup.valueChanges.subscribe(value =>console.log(value))//
    this.onboardingFormGroup.get('collateral').valueChanges.subscribe(value =>console.log(value))
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
createNewLender(data) {
  this.sendLenderData.emit(data)

}

// what happens when you click the radio button

selectCollateral(security: string):void{
  const collateralControl = this.onboardingFormGroup.get('collateral');
  if (security === 'logbook'){
    collateralControl.setValue('logbook')
  } else if(security === 'titleDeed'){
    collateralControl.setValue('titleDeed')
  }else {
    collateralControl.setValue('none')
  }
}

}
