import { AuthService } from "../../services/auth";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from "ionic-angular";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: "Signing you up..."
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data);
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup Failed',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
