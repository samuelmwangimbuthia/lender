import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  //guard against data corruption
originalUserSettings:UserSettings = {
  name: null,
  emailOffers: null,
  interfaceStyle:  null,
  subscriptionType: null,
  notes: null
}

singleModel = "on";
//working with a copy of the data
userSettings:UserSettings = {...this.originalUserSettings}
  constructor(private dataService: DataService) { }
postError = false;
postErrorMessage = '';

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    console.log(form.valid);
    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      result => {console.log(result)},
      err => this.onHttpError(err)

    )
  }

  onBlur(field:NgModel){
    console.log(field.valid)
  }

  onHttpError(errorResponse:any){
console.log("error:", errorResponse);
this.postError= true;
this.postErrorMessage = errorResponse.error.errorMessage

  };

}
