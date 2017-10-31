import { RecipeService } from './../services/recipe';
import { ShoppingListService } from './../services/shopping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { TabsPage } from '../pages/tabs/tabs';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from "./app.component";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditRecipePage,
    ShoppingListPage,
    RecipePage,
    RecipesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditRecipePage,
    ShoppingListPage,
    RecipePage,
    RecipesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService
  ]
})
export class AppModule {}
