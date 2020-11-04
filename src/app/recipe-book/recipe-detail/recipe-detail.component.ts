import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookServices} from '../recipe-book.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;
  constructor(private recipeBookServices: RecipeBookServices, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.recipe = this.recipeBookServices.getSpecificRecipe(+this.route.snapshot.params['id']);

     this.route.params.subscribe(
       (params: Params) => {
         this.recipe = this.recipeBookServices.getSpecificRecipe(+params['id']);
       }
     );
  }

  onAddToShoppingList(){
    this.recipeBookServices.addIngrendientsToShoppingList(this.recipe.ingredients);
  }

}
