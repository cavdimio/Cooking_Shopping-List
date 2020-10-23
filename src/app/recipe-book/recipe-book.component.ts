import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  recipeSelected : Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onSendingRecipeDetails(recipe: Recipe){
    this.recipeSelected = recipe;
  }

}
