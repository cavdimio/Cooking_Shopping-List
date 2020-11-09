import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  Ingredient
} from 'src/app/shared/ingredient.model';
import {
  ShoppingListServices
} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {
    static: false
  }) name: ElementRef;
  @ViewChild('amountInput', {
    static: false
  }) amount: ElementRef;

  constructor(private shoppingListServices: ShoppingListServices) {}

  ngOnInit(): void {}

  /* Add item functionality */
  OnAddItem() {
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    this.shoppingListServices.onAddingNewItem(newIngredient);
  }

  /* Delete item functionality */
  onDeleteItem() {
    this.shoppingListServices.onDeletingItem({
      name: "Apples",
      amount: 9
    });
  }

  /* Clear list functionality */
  OnClearList() {
    this.shoppingListServices.onClearShoppingList();
  }
}
