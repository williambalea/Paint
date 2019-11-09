import { Injectable } from '@angular/core';
import { EMPTY_STRING, TOOL } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  cursor;

  constructor() {
    this.cursor = EMPTY_STRING;
  }

  setCursor(tool: string): void {
    if (tool === TOOL.text) {
      this.cursor = 'cursor: text';
    } else {
      this.cursor = `cursor: url("../../../assets/cursors/'${tool}.svg"), default;`;
    }
  }

  getCursor(): string {
    return this.cursor;
  }
}
