import { RecipePage } from './../recipe/recipe';
import { RecipeService } from './../../services/recipe';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe () {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(index, recipe) {
    this.navCtrl.push(RecipePage, {index: index, recipe: recipe});
  }
}
