import { SignupPage } from './../signup/signup';
import { SigninPage } from './../signin/signin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AuthTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth-tab',
  templateUrl: 'auth-tab.html',
})
export class AuthTabPage {
  signinPage = SigninPage;
  signupPage = SignupPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
