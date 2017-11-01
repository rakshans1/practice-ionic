import { DbOptionsPage } from './../db-options/db-options';
import { AuthService } from './../../services/auth';
import { RecipePage } from "./../recipe/recipe";
import { RecipeService } from "./../../services/recipe";
import { Recipe } from "./../../models/recipe";
import { EditRecipePage } from "./../edit-recipe/edit-recipe";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController} from "ionic-angular";

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-recipes",
  templateUrl: "recipes.html"
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RecipesPage");
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: "New" });
  }

  onLoadRecipe(index, recipe) {
    this.navCtrl.push(RecipePage, { index: index, recipe: recipe });
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
            this.recipeService.getList(token)
            .subscribe(
              (list: Recipe[]) => {
                loading.dismiss();
                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
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
            this.recipeService.saveList(token)
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
