
/* */
import { Component, OnInit} from '@angular/core';

import {  } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* Variable for collapsing the navbar */
  collapsed = true;


  constructor() { }

  ngOnInit(): void {
  }

}
