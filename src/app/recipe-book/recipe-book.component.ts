import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeBookServices} from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [ RecipeBookServices ]
})

export class RecipeBookComponent implements OnInit, OnDestroy {
  selectedRecipe : Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
