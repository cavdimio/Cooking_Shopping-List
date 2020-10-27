import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListServices {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient('Pinapple', 9)
  ];

  getIngredients(){
    return this.ingredients;
  }

  onAddingNewItem(ingredient: Ingredient){
    this.ingredients.push(ingredient);
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
