import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeBookServices } from '../recipe-book/recipe-book.service';
import { Recipe } from "../recipe-book/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageServices {

  constructor(private http: HttpClient, private recipesBookServices: RecipeBookServices){}

  storeAllRecipes() {

  }

  storeNewRecipe(recipe: Recipe){
    const recipes = this.recipesBookServices.getRecipes();
    const recipesChanged = this.recipesBookServices.recipesChanged;

    this.http.post<{message: string}>("http://localhost:3000/recipes", recipe)
    .subscribe( (responseData) =>{
      console.log(responseData.message);
      recipes.push(recipe);
      recipesChanged.next(recipes.slice());
    });
  }

  deleteAllRecipes() {}

  deleteOneRecipe(index: number){}

  getAllRecipes() {

    this.http.get<{message: string, recipes: Recipe[]}>("http://localhost:3000/recipes")
    .subscribe((recipeData) => {
       this.recipesBookServices.recipes = recipeData.recipes;
       this.recipesBookServices.recipesChanged.next(this.recipesBookServices.recipes.slice());
    });
    return null;
  }
}
