import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListServices} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListServices : ShoppingListServices) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListServices.getIngredients();
  }

 // onAddingNewItem(ingredient: Ingredient){
  //  this.ingredients.push(ingredient);
 // }
}
