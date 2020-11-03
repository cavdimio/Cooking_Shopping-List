import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookServices} from '../recipe-book.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;
  constructor(private recipeBookServices: RecipeBookServices) { }

  ngOnInit(): void {
  }

  onAddToShoppingList(){
    this.recipeBookServices.addIngrendientsToShoppingList(this.recipe.ingredients);
  }

}
