import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnboardLenderService } from '../onboard-lender.service';

@Component({
  selector: 'app-start-lending',
  templateUrl: './start-lending.component.html',
  styleUrls: ['./start-lending.component.css']
})
export class StartLendingComponent implements OnInit {
  onboardingForm: FormGroup

  constructor(private onboardLenderService:OnboardLenderService) { }

  ngOnInit() {

    //form control instances for individual template input elements
    let firstNameControl = new FormControl('');
    let lastNameControl = new FormControl('');
    let phoneNumberControl = new FormControl('');
    let emailControl = new FormControl('');
    let noneControl = new FormControl('');
    let logbookControl = new FormControl('');
    let titleDeedControl = new FormControl('');
    let amountControl = new FormControl('');

    //add the controls in a group

    this.onboardingForm = new FormGroup({
      firstName: firstNameControl,
      lastName: lastNameControl,
      phoneNumber: phoneNumberControl,
      email: emailControl,
      none: noneControl,
      logbook: logbookControl,
      titleDeed: titleDeedControl,
      amount: amountControl
    })

    //this.onboardLenderService.onboardLender().subscribe({ })

   
  }
  login(formValues){
    console.log(formValues)
  }

}
