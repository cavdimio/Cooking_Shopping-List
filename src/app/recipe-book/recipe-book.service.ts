import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient} from 'src/app/shared/ingredient.model';
import {ShoppingListServices} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeBookServices {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] =[
    new Recipe("Hamburger", "A delicious Fast Food", "data:image/jpeg;base64,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", [{ name: "Meat" , amount: 6 } , { name: "Bread" , amount: 2} ] ),
    new Recipe("Hamburger2", "A delicious Fast Food2", "data:image/jpeg;base64,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", [{ name: "Meat" , amount:6 } , { name: "Bread" , amount:2} ] )
  ];

  constructor(private shoppingListServices : ShoppingListServices){};

  getRecipes() {
    return this.recipes.slice();
  }

  addIngrendientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListServices.onAddingMultipleItems(ingredients);
  }


}
