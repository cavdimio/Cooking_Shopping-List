import {
  Component,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  RecipeBookServices
} from '../recipe-book.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  /* Id of selected recipe that will be edited */
  id: number;
  /* Boolean that shows whether the app is on edit mode of an existing recipe or on adding a new
  recipe : editMode:true --> edit recipe, editMode:false --> add new recipe */
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeBookServices: RecipeBookServices) {}

  ngOnInit(): void {
    /* Depend on link, we can find out from which component, this component is called*/
    this.route.params.subscribe(
      (params: Params) => {
        /* If id exists, then the user wants to modify the specific recipe */
        if (params['id']) {
          this.id = +params['id'];
          this.editMode = true;
          this.initForm();
        } else {
          /* New recipe to be added */
          this.id = this.recipeBookServices.getRecipes().length;
          this.editMode = false;
        }
      }
    )
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    if (this.editMode){
      const currentRecipe = this.recipeBookServices.getSpecificRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeImagePath = currentRecipe.imagePath;
      recipeDescription = currentRecipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }

}
