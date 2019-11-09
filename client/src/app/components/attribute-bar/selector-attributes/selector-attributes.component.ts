import { Component } from '@angular/core';
import { ClipboardService } from '../../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-selector-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './selector-attributes.component.html',
})
export class SelectorAttributesComponent {

  constructor(public clipboardService: ClipboardService) {
    this.clipboardService.findSelected();
  }

}
