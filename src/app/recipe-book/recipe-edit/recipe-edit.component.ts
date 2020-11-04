import {
  Component,
  OnInit
} from '@angular/core';
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
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private recipeBookServices: RecipeBookServices) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.id = +params['id'];
          this.editMode = true;
        } else {
          this.id = this.recipeBookServices.getRecipes().length;
          this.editMode = false;
        }
      }

    )
  }

}
