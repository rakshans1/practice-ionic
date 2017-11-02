import { AuthTabPage } from './../pages/auth-tab/auth-tab';
import { AuthService } from "./../services/auth";
import { NavController, MenuController } from "ionic-angular";
import { TabsPage } from "./../pages/tabs/tabs";
import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import firebase from "firebase";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = TabsPage;
  isAuthenticated = false;
  @ViewChild("nav") nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyAReQF7sK3cgv9coUn-OKK22ktvf3fvJzg",
      authDomain: "shopping-list-app-5a2c2.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = AuthTabPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
