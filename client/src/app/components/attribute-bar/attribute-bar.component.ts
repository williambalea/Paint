import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})
export class AttributeBarComponent implements OnInit {
  @Input() test: number;
  constructor() { }

  ngOnInit() { }

}
