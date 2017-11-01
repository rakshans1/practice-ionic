import { DbOptionsPage } from './../db-options/db-options';
import { AuthService } from './../../services/auth';
import { Ingredient } from "./../../models/ingredient";
import { ShoppingListService } from "./../../services/shopping-list";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from "ionic-angular";
import { NgForm } from "@angular/forms";
/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  shoppingList: Ingredient[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShoppingListPage");
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.shoppingList = this.slService.getItems();
  }

  onShowOptions(event) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait'
    });
    const popover = this.popoverCtrl.create(DbOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }
      if (data.action == 'load') {
        loading.present();
        this.authService.getActivatedUser().getToken()
        .then(
          token  => {
            this.slService.getList(token)
            .subscribe(
              (list: Ingredient[]) => {
                loading.dismiss();
                if (list) {
                  this.shoppingList = list;
                } else {
                  this.shoppingList = [];
                }
              },
              err => this.handleError(err.json().error)
            );
          }
        );
      } else {
        loading.present();
        this.authService.getActivatedUser().getToken()
        .then(
          token  => {
            this.slService.saveList(token)
            .subscribe(
              () => loading.dismiss(),
              err => {
                loading.dismiss();
                this.handleError(err.message);
              }
            );
          }
        );
      }
    });
  }

  private handleError(error: string) {
    const alert = this.alertCtrl.create({
      title: 'An Error occurred!',
      message: error,
      buttons: ['OK']
    });
    alert.present();
  }
}
