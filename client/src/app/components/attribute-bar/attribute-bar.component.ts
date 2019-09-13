import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss']
})
export class AttributeBarComponent implements OnInit {
  @Input() test : number;
  constructor() { }

  ngOnInit() {
  }

}
