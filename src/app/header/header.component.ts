
/* */
import { Component, OnInit } from '@angular/core';
import { RecipeBookServices } from '../recipe-book/recipe-book.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* Variable for collapsing the navbar */
  collapsed = true;


  constructor(private recipeBookServices: RecipeBookServices,) { }

  ngOnInit(): void {
  }

  onGetRandomRecipe(){
     //TODO Implement Random Recipe mechanism
  }
}
