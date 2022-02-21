import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser
  constructor() { }

  loginUser(userName:String, password:String){ //keep check of the current user
//TO DO: To be returned by the server on authentication
    this.currentUser = {
      userName: userName,
      first_name:'John',
      last_name:'Papa'
    }
  }

  isAuthenticated(){
    return !!this.currentUser;
  }
}
