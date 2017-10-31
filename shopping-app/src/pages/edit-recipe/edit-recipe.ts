import { Recipe } from './../../models/recipe';
import { RecipeService } from './../../services/recipe';
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-recipe",
  templateUrl: "edit-recipe.html"
})
export class EditRecipePage implements OnInit {
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditRecipePage");
  }

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get("recipe");
      this.index = this.navParams.get("index");
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = []

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1};
      });
    }
    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipeService.addrecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do ?",
      buttons: [
        {
          text: "Add Ingredient",
          handler: () => {
            this.createNewIngredientMethod().present();
          }
        },
        {
          text: "Remove all ingredients",
          role: "destructive",
          handler: () => {
            const fArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0 ) {
              for (let i = len - 1; i >=0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted',
                duration: 1000,
              });
              toast.present();
            }
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientMethod() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please Enter a Valid value',
                duration: 1000,
              });
              toast.present();
              return
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item Added',
              duration: 1000,
            });
            toast.present();
          }
        }
      ]
    });
  }
}
