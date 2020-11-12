
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable() /* --> for adding the ShoppingListServices */
export class RecipeBookServices {

  /* Recipe table */
  private recipes: Recipe[] =[];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListServices : ShoppingListServices, private http: HttpClient){};

  /* Copy of Recipes */
  getRecipes() {
     this.http.get<{message: string, recipes: Recipe[]}>("http://localhost:3000/recipes")
     .subscribe((recipeData) => {
        this.recipes = recipeData.recipes;
        this.recipesChanged.next(this.recipes.slice());
     });
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

  addRecipe(recipe: Recipe) {
    this.http.post<{message: string}>("http://localhost:3000/recipes", recipe)
    .subscribe( (responseData) =>{
      console.log(responseData.message);
      this.recipes.push(recipe); /*-->This line: TODO  to be deleted */
      this.recipesChanged.next(this.recipes.slice());
    });
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
