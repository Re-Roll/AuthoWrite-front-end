import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };

  loginObj: any = {
    userName: '',
    password: ''
  };

  ngOnInit():void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    if (this.signupObj.userName == '' || this.signupObj.password == '' || this.signupObj.email == '') {
      alert('Please fill in all the fields!');
    } else {

    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
    
    alert('Signup Successful');
  }

  }

  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);
    if(isUserExist != undefined && this.loginObj.userName != '' && this.loginObj.password != '') {
      alert('User Login Successful');
      this.router.navigate(['dashboard']);
    } else {
      alert('Wrong Credentials');
    }
  }
  constructor(private router: Router) {}

}
