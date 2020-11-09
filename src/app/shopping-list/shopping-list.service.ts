import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListServices {

  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient('Pinapple', 9)
  ];

  getIngredients(){
    return this.ingredients.slice();

  }

  onAddingNewItem(ingredient: Ingredient){

    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onAddingMultipleItems(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onDeletingItem(ingredient: Ingredient){
    for(var i=0; i<this.ingredients.length; i++)
    {
      if (ingredient.name === this.ingredients[i].name)
      {
        this.ingredients.splice( i ,1);
        break;
      }
    }
  }

  onClearShoppingList(){
    this.ingredients.splice( 0 , this.ingredients.length);
  }



}
