
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable() /* --> for adding the ShoppingListServices */
export class RecipeBookServices {

  /* Recipe table */
  recipes: Recipe[] =[];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListServices : ShoppingListServices,
              private http: HttpClient){};

  /* Copy of Recipes */
  getRecipes() {
    return this.recipes.slice();
  }

  /* Get specific recipe */
  getSpecificRecipe(id: number){
    return this.recipes[id];
  }

  /* For Adding ingredients to shopping List */
  addIngrendientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListServices.onAddingMultipleItems(ingredients);
  }

  updateRecipe(index: number, changedRecipe: Recipe){
    this.recipes[index] = changedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, index+1);
    for(var i=index; i<this.recipes.length; i++){
      this.recipes[i].id -=1;
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteIngredient(recipeIndex: number, ingredientIndex: number){
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, ingredientIndex+1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
