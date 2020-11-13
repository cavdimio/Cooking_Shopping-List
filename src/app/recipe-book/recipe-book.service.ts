
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
  getSpecificRecipe(_id: string): Recipe {
  const specificRecipeIndex = this.recipes.findIndex(element => element._id === _id);
  return this.recipes[specificRecipeIndex];
  }

  /* For Adding ingredients to shopping List */
  addIngrendientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListServices.onAddingMultipleItems(ingredients);
  }

  updateRecipe(_id: string, changedRecipe: Recipe){
    //console.log(_id);
   // console.log(changedRecipe);
    const recipeIndex = this.recipes.findIndex(element => element._id === _id);
    //console.log(recipeIndex);
    this.recipes[recipeIndex] = changedRecipe;

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(_id: string){
    const recipeIndex = this.recipes.findIndex(element => element._id === _id);
    this.recipes.splice(recipeIndex, recipeIndex+1);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteIngredient(_id: string, ingredientIndex: number){
    const recipeIndex = this.recipes.findIndex(element => element._id === _id);
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, ingredientIndex+1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
