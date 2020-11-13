import {
  Component,
  OnInit
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  RecipeBookServices
} from '../recipe-book.service';
import {
  DataStorageServices
} from "../../shared/data-storage.service";
import { Recipe } from '../recipe.model';

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

  constructor(private route: ActivatedRoute,
              private recipeBookServices: RecipeBookServices,
              private dataStorageServices : DataStorageServices,
              private router: Router) {}

  ngOnInit(): void {
    /* Depend on link, we can find out from which component, this component is called*/
    this.route.params.subscribe(
      (params: Params) => {
        /* If id exists, then the user wants to modify the specific recipe */
        if (params['id']) {
          this.id = +params['id'];
          this.editMode = true;
        } else {
          /* New recipe to be added */
          this.id = this.recipeBookServices.getRecipes().length;
          this.editMode = false;
        }
        this.initForm();
      }
    )
  }

  onSubmit() {

    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.controls.name.value,
      this.recipeForm.controls.description.value,
      this.recipeForm.controls.imagePath.value,
      this.recipeForm.controls.ingredients.value
    );

    if(this.editMode){
      /* Existing Recipe */
      this.recipeBookServices.updateRecipe(this.id, newRecipe);
    } else {
      /* New recipe */
      this.dataStorageServices.storeNewRecipe(newRecipe);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route } );
  }

  OnAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [ Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/) ] )
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }



  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients= new FormArray([]);

    if (this.editMode){
      const currentRecipe = this.recipeBookServices.getSpecificRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeImagePath = currentRecipe.imagePath;
      recipeDescription = currentRecipe.description;
      if (currentRecipe['ingredients']){
        for(let ingredient of currentRecipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [ Validators.required,
                Validators.pattern(/^\d+(\.\d{1,2})?$/) ] )
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
