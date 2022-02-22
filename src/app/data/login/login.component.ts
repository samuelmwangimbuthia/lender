import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit() {

    this.loginForm =new FormGroup({
      userName: new FormControl(),
      password: new FormControl()
    })
  }


  login(value){
    console.log(value.userName);
    this.auth.loginUser(value.userName,value.password)
  };

  cancel(){
    this.router.navigate(["/home"]); //Display success message
  }
}
