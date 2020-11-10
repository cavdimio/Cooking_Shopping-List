import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookServices} from '../recipe-book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  /* List of recipes to be displayed */
  recipes: Recipe[];
  recipesSubscription: Subscription;

  /* RecipeBookServices to outsource the recipes */
  constructor(private recipeBookServices: RecipeBookServices) { }

  ngOnInit(): void {
    this.recipes = this.recipeBookServices.getRecipes();
    this.recipesSubscription = this.recipeBookServices.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
