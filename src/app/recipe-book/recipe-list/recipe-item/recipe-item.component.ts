import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  /* Recipe to be displayed in the list */
  @Input() recipe : Recipe;

  constructor() { }

  ngOnInit(): void {
  }
}
