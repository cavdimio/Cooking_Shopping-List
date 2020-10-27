import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeBookServices } from '../../recipe-book.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : Recipe;

  constructor(private recipeBookServices: RecipeBookServices) { }

  ngOnInit(): void {
  }

  OnSendData(){
    this.recipeBookServices.recipeSelected.emit(this.recipe);
  }
}
