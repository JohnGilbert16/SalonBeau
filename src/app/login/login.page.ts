/* eslint-disable @typescript-eslint/member-ordering */ import {
  Component,
  OnInit,
} from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public emailLogin: string = '';
  public passwordLogin: string = '';
  

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
