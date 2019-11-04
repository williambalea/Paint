import { Component } from '@angular/core';
import { ClipboardService } from '../../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-selector-attributes',
  templateUrl: './selector-attributes.component.html',
  styleUrls: ['../attribute-bar.component.scss']
})
export class SelectorAttributesComponent {

  constructor(private clipboardService: ClipboardService) {
    this.clipboardService.findSelected();
  }

}
