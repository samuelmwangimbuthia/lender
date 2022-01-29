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
      firstName: ['',[Validators.pattern, Validators.minLength(1)]],
      lastName: ['',[Validators.pattern, Validators.minLength(1)]],
      phoneNumber: Number,
      email: ['', [Validators.required, Validators.email]],
      amount: Number,
      collateral: '',
    })


this.populateLendersData();
}

 //the method shall be reused by the borrower and lender component to prepopulate the form with
  //with the saved data
populateLendersData(){
  this.onboardingFormGroup.setValue({
    firstName: 'Samuel',
      lastName: 'Mwangi',
      phoneNumber: 729782466,
      email: 'mbuthia.jsamuel@gmail.com',
      amount: 20000,
      collateral: 'logbook'
  })
}
/*createNewLender(data){
  console.log(data)
} */
createNewLender(data) {
  this.sendLenderData.emit(data)

}
}
