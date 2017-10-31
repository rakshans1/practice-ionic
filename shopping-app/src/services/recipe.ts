import { Ingredient } from "./../models/ingredient";
import { Recipe } from "./../models/recipe";

export class RecipeService {
  recipe: Recipe[] = [];

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
}
