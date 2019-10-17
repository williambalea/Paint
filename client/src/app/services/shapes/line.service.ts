  import { Injectable, Renderer2 } from '@angular/core';
  import { EMPTY_STRING, JUNCTIONSTYLE, LINECORNER, NB, STROKE_DASHARRAY_STYLE } from 'src/constants';
  import { Point } from '../../../../../common/interface/point';
  import { ColorService } from '../color/color.service';
  import { InputService } from '../input.service';
  import { Shape } from './shape';

  @Injectable({
  providedIn: 'root',
})
export class LineService implements Shape {

  linepath: string;
  stroke: string;
  strokeWidth: number;
  active: boolean;
  positions: Point[];
  start: boolean;
  savedPath: string;
  doubleClick: boolean;
  dashArrayType: string;
  junction: string;
  junctionStyle: string;
  junctionValue: string;

  path: HTMLElement;

  constructor(private renderer: Renderer2,
              private inputService: InputService,
              private colorService: ColorService) {
    this.strokeWidth = NB.Seven;
    this.doubleClick = false;
    this.junctionStyle = LINECORNER.angled;
    this.junctionValue = JUNCTIONSTYLE.angled;
    this.dashArrayType = STROKE_DASHARRAY_STYLE.fullLine;
    this.junction = EMPTY_STRING;
    this.reset();
    }

  reset(): void {
    this.start = true;
    this.stroke = EMPTY_STRING;
    this.active = false;
    this.linepath = EMPTY_STRING;
    this.savedPath = EMPTY_STRING;
    this.positions = [];
  }

  onMouseDown(): any {
    this.positions.push(this.inputService.getMouse());
    this.active = true;
    this.stroke = this.colorService.getFillColor();
    this.validationToCreatePath();
    this.setStyle();
    this.draw();
    return this.path;
  }

  validationToCreatePath() {
    if (this.start) {
      this.path = this.renderer.createElement('path', 'svg');
      }
  }

  setStyle() {
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'fill', 'none');
    this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
    this.renderer.setStyle(this.path, 'stroke-dasharray', this.dashArrayType);
    this.validateJunctionStyle();
  }

  validateJunctionStyle() {
    if (this.junctionStyle === LINECORNER.dot) {
      this.renderer.setStyle(this.path, 'marker-start', this.junction);
      this.renderer.setStyle(this.path, 'marker-mid', this.junction);
      this.renderer.setStyle(this.path, 'marker-end', this.junction);
      } else {
      this.renderer.setStyle(this.path, 'stroke-linejoin', this.junctionValue);
      }
  }

  onMouseMove(): any {
    if (this.active) {
      this.linepath = this.savedPath + `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y}`;
      this.renderer.setAttribute(this.path, 'd', this.linepath);
    }
    if (this.inputService.backSpacePressed) {
      if (this.positions.length > 1) {
        this.positions.pop();
      }
      this.stroke = this.colorService.getFillColor();
      if (this.start) {
        this.path = this.renderer.createElement('path', 'svg');
      }
      this.setStyle();
      this.redraw();
      return this.path;
    }
    if (this.inputService.shiftPressed) {
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.renderer.setAttribute(this.path, 'd', this.linepath += 'Z');
      this.reset();
    }

    this.doubleClick = false;
    }

  onMouseUp(): void {
    if (this.inputService.escapePressed) {
      this.reset();
    }
    if (this.doubleClick === true) {
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.reset();
    }
    this.doubleClick = true;
  }

  draw() {
    if (this.start) {
    this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[this.positions.length - 1].x} ${this.positions[this.positions.length - 1].y}`;
    }
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.start = false;
    this.savedPath = this.linepath;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
  }

  redraw() {
    for (let  i = 0; i < this.positions.length; i++) {
    if  (i === 0) {
      this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[i].x} ${this.positions[i].y}`;
    }
  }
    this.renderer.setAttribute(this.path, 'd', this.linepath);
    this.start = false;
    this.savedPath = this.linepath;
    this.colorService.addColorsToLastUsed(this.colorService.getFillColor());
}

assignStrokeStyleDottedPoint(): void {
  this.dashArrayType = STROKE_DASHARRAY_STYLE.dottedPoint;
}

assignStrokeStyleDottedLine(): void {
  this.dashArrayType = STROKE_DASHARRAY_STYLE.dottedLine;
}

assignStrokeStyleFullLine(): void {
  this.dashArrayType = STROKE_DASHARRAY_STYLE.fullLine;
}

assignStrokeStyle(): void {
  switch (this.dashArrayType) {
    case STROKE_DASHARRAY_STYLE.dottedPoint:
      this.assignStrokeStyleDottedPoint();
      break;
    case STROKE_DASHARRAY_STYLE.dottedLine:
      this.assignStrokeStyleDottedLine();
      break;
    case STROKE_DASHARRAY_STYLE.fullLine:
      this.assignStrokeStyleFullLine();
      break;
    default:
  }
}

captDot(newJunction: string): void {
  this.junction = `url(#${newJunction})`;
}

changeJunction(): void {
  switch (this.junctionStyle) {
    case LINECORNER.dot:
        this.captDot('dot');
        break;
    case LINECORNER.angled:
      this.assignJunctionStyleAngled();
      break;
    case LINECORNER.rounded:
      this.assignJunctionStyleRounded();
      break;
  }
}

assignJunctionStyleAngled(): void {
  this.junctionValue = LINECORNER.angled;
}

assignJunctionStyleRounded(): void {
  this.junctionValue = LINECORNER.rounded;
}

}
