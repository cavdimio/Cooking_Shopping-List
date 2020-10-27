import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeBookServices} from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [ RecipeBookServices ]
})
export class RecipeBookComponent implements OnInit {
  selectedRecipe : Recipe;

  constructor(private recipeBookServices: RecipeBookServices) { }

  ngOnInit(): void {
    this.recipeBookServices.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      })
  }

}
