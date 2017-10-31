import { Ingredient } from './../models/ingredient';
export class ShoppingListService {
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
}
