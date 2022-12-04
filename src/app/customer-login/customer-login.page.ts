import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
})
export class CustomerLoginPage implements OnInit {
  public emailLogin: string = '';
  public passwordLogin: string = '';
  pwdIcon = "eye-outline";
  showPwd = false;

  togglePwd(){
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
 
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService

    
  ) {}
  

  // setEmail(e: any){
  //   this.emailLogin = e.target.value;
  // }

  // setPassword(e: any){
  //   this.passwordLogin = e.target.value;
  // }

  ngOnInit() {}

  login() {
    this.authService.loginUser(this.emailLogin, this.passwordLogin);
  }

  toSignUp(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
