import { AuthService } from "./auth";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Ingredient } from "./../models/ingredient";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
  constructor(private http: Http, private authService: AuthService) {}

  private shoppingList: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.shoppingList.push(new Ingredient(name, amount));
    console.log(this.shoppingList);
  }

  addItems(items: Ingredient[]) {
    this.shoppingList.push(...items);
  }

  getItems() {
    return this.shoppingList.slice();
  }

  removeItem(index: number) {
    this.shoppingList.splice(index, 1);
  }

  saveList(token: string) {
    const userId = this.authService.getActivatedUser().uid;
    return this.http
      .put(
        "https://shopping-list-app-5a2c2.firebaseio.com/"+userId+"/shopping-list.json?auth="+token,
        this.shoppingList
      )
      .map((response: Response) => {
        return response.json()
      });
  }

  getList(token: string) {
    const userId = this.authService.getActivatedUser().uid;
    return this.http.get("https://shopping-list-app-5a2c2.firebaseio.com/"+userId+"/shopping-list.json?auth="+token)
    .map((response: Response) => {
      return response.json();
    })
    .do((data) => {
      this.shoppingList = data;
    })
  }
}
