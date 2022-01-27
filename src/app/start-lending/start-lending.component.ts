import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-start-lending',
  templateUrl: './start-lending.component.html',
  styleUrls: ['./start-lending.component.css']
})
export class StartLendingComponent implements OnInit {
  // linking the child component to the parent
  @Output() sendLenderData: EventEmitter<{}> = new EventEmitter<{}>()
  onboardingFormGroup: FormGroup
  constructor() { }

  ngOnInit() {

    // controls for all onboarding form input fields
    let firstName = new FormControl();
    let lastName = new FormControl();
    let phoneNumber = new FormControl();
    let email = new FormControl();
    let none = new FormControl();
    let logbook = new FormControl();
    let titleDeed = new FormControl();
    let amount = new FormControl();

    //to add all these controls to the onboarding form,
    // set properties on each of the controls
    this.onboardingFormGroup = new FormGroup(
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        none: none,
        logbook: logbook,
        titleDeed: titleDeed,
        amount: amount,
      }
    )

  }
  /*createNewLender(data){
    console.log(data)
  } */
  createNewLender(data) {
    this.sendLenderData.emit(data)

  }
}
