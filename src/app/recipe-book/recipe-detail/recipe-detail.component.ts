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
  /* RecipeBookServices in order to show a specific recipe, Router to service routers in html  */
  constructor(private recipeBookServices: RecipeBookServices, private route: ActivatedRoute) { }

  ngOnInit(): void {
  //   /* For displaying a recipe (only works for first time - optional) */
  //  this.recipe = this.recipeBookServices.getSpecificRecipe(+this.route.snapshot.params['id']);

   /* For displaying a recipe */
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
