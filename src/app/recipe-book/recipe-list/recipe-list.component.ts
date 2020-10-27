import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookServices} from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeBookServices: RecipeBookServices) { }

  ngOnInit(): void {
    this.recipes = this.recipeBookServices.getRecipes();
  }

}
