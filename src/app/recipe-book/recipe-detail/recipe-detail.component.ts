import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Recipe
} from '../recipe.model';
import {
  RecipeBookServices
} from '../recipe-book.service';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  DataStorageServices
} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  /* RecipeBookServices in order to show a specific recipe, Router to service routers in html  */
  constructor(private recipeBookServices: RecipeBookServices,
    private dataStorageServices: DataStorageServices,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {

    // if(!this.recipe){
    //   this.recipe = this.dataStorageServices.getSpecificRecipe(this.route.params._value._id);
    //   console.log(this.recipe);
    // }

     if (!this.recipeBookServices.recipes) {
    //   /* For displaying a recipe directly from the link */
       this.route.params.map(
         (params: Params) => {
           this.dataStorageServices.getSpecificRecipe(params['_id']);
           this.recipe = this.recipeBookServices.getSpecificRecipe(params['_id']);
         }
       );
     } else {
      /* For displaying a recipe from the menu */
      this.route.params.subscribe(
        (params: Params) => {
          this.recipe = this.recipeBookServices.getSpecificRecipe(params['_id']);
        }
      );
    }


  }

  onAddToShoppingList() {
    this.recipeBookServices.addIngrendientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeBookServices.deleteRecipe(this.recipe._id);
    this.router.navigate(['/recipes']);
  }
}
