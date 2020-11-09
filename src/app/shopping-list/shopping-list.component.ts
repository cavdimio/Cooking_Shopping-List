import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import {
  Ingredient
} from '../shared/ingredient.model';
import {
  ShoppingListServices
} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubcription: Subscription;

  constructor(private shoppingListServices: ShoppingListServices) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListServices.getIngredients();
    this.ingredientSubcription = this.shoppingListServices.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListServices.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientSubcription.unsubscribe();
  }

}
