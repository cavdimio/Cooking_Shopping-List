import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ShoppingListServices } from "../shopping-list.service";
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {
    static: false
  }) slForm: NgForm;

  private startEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServices: ShoppingListServices) {}

  ngOnInit(): void {
    this.startEditingSubscription = this.shoppingListServices.startedEditing.subscribe(
      (index: number ) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListServices.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  /* Add item functionality */
  OnSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListServices.onUpdatingExistingItem( this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.shoppingListServices.onAddingNewItem(newIngredient);
    }
    this.slForm.reset();
  }

  /* Delete item functionality */
  onDeleteItem(form: NgForm) {
    this.shoppingListServices.onDeletingItem(this.editedItemIndex);
    this.OnClearList();
  }

  /* Clear list functionality */
  OnClearList() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy():void{
    this.startEditingSubscription.unsubscribe();
  }
}
