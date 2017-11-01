import { Ingredient } from "./../models/ingredient";
import { Recipe } from "./../models/recipe";

import { AuthService } from "./auth";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipe: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addrecipe(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipe.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipe);
  }

  getRecipe() {
    return this.recipe.slice();
  }

  updateRecipe(
    index: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipe[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipe.splice(index, 1);
  }
  saveList(token: string) {
    const userId = this.authService.getActivatedUser().uid;
    return this.http
      .put(
        "https://shopping-list-app-5a2c2.firebaseio.com/"+userId+"/recipe.json?auth="+token,
        this.recipe
      )
      .map((response: Response) => {
        return response.json()
      });
  }

  getList(token: string) {
    const userId = this.authService.getActivatedUser().uid;
    return this.http.get("https://shopping-list-app-5a2c2.firebaseio.com/"+userId+"/recipe.json?auth="+token)
    .map((response: Response) => {
      const recipes: Recipe[] = response.json() ? response.json() : [];
      for(let item of recipes) {
        if (!item.hasOwnProperty('ingredients')) {
          item.ingredients = [];
        }
      }
      return recipes;
    })
    .do((data) => {
      this.recipe = data;
    })
  }
}
