import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { TextService } from 'src/app/services/shapes/text.service';
import { FONTALIGN, FONTS, FONTSIZES } from 'src/constants';

@Component({
  selector: 'app-text-attributes',
  styleUrls: ['../attribute-bar.component.scss'],
  templateUrl: './text-attributes.component.html',
})
export class TextAttributesComponent {
  fonts: string[];
  fontSizes: number[];
  fontAlign: typeof FONTALIGN;

  constructor(public textService: TextService,
              public colorService: ColorService) {
    this.fonts = FONTS;
    this.fontSizes = FONTSIZES;
    this.textService.isWriting = false;
  }

}
