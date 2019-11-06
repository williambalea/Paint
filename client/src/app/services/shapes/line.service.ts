  import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
  import { EMPTY_STRING, JUNCTIONSTYLE, LINECORNER, NB, STROKE_DASHARRAY_STYLE } from 'src/constants';
  import { Point } from '../../../../../common/interface/point';
  import { ColorService } from '../color/color.service';
  import { InputService } from '../input.service';
  import { ViewChildService } from '../view-child.service';
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
  dotSize: number;
  renderer: Renderer2;

  path: HTMLElement;

  constructor(private rendererFactory: RendererFactory2,
              private inputService: InputService,
              private colorService: ColorService,
              private viewChildService: ViewChildService) {
    this.strokeWidth = NB.Seven;
    this.doubleClick = false;
    this.junctionStyle = LINECORNER.angled;
    this.junctionValue = JUNCTIONSTYLE.angled;
    this.dashArrayType = STROKE_DASHARRAY_STYLE.fullLine;
    this.junction = EMPTY_STRING;
    this.dotSize = NB.Seven;
    this.reset();
    this.renderer = this.rendererFactory.createRenderer(null, null);
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
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, this.path);
    return this.path;
  }

  validationToCreatePath(): void {
    if (this.start) {
      this.path = this.renderer.createElement('path', 'svg');
      }
  }

  setStyle(): void {
    this.renderer.setStyle(this.path, 'stroke', this.stroke.toString());
    this.renderer.setStyle(this.path, 'stroke-linecap', 'round');
    this.renderer.setStyle(this.path, 'fill', 'none');
    this.renderer.setStyle(this.path, 'stroke-width', this.strokeWidth.toString());
    this.renderer.setStyle(this.path, 'stroke-dasharray', this.dashArrayType);
    this.validateJunctionStyle();
  }

  validateJunctionStyle(): void {
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
      this.isActive();
    }
    if (this.inputService.backSpacePressed) {
      this.isBackSpacePressed();
    }
    if (this.inputService.shiftPressed) {
      this.isShiftPressed();
    }

    this.doubleClick = false;
    }

    isActive(): void {
      this.linepath = this.savedPath + `L${this.inputService.getMouse().x} ${this.inputService.getMouse().y}`;
      this.renderer.setAttribute(this.path, 'd', this.linepath);
    }

    isBackSpacePressed(): HTMLElement {
      this.deletePosition();
      this.stroke = this.colorService.getFillColor();
      this.validationToCreatePath();
      this.setStyle();
      this.redraw();
      return this.path;
    }

    deletePosition(): void {
      if (this.positions.length > 1) {
        this.positions.pop();
      }
    }

    isShiftPressed(): void {
      this.renderer.setAttribute(this.path, 'd', this.linepath += 'Z');
      this.reset();
    }

  onMouseUp(): void {
    if (this.inputService.escapePressed) {
      this.reset();
    }
    if (this.doubleClick) {
      this.renderer.setAttribute(this.path, 'd', this.linepath);
      this.reset();
    }
    this.doubleClick = true;
  }

  draw(): void {
    if (this.start) {
    this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[this.positions.length - 1].x} ${this.positions[this.positions.length - 1].y}`;
    }
    this.finishDraw();
  }

  redraw(): void {
    for (let  i = 0; i < this.positions.length; i++) {
    if  (i === 0) {
      this.linepath = `M${this.positions[0].x} ${this.positions[0].y}`;
    } else {
      this.linepath += `L${this.positions[i].x} ${this.positions[i].y}`;
    }
  }
    this.finishDraw();
}

finishDraw(): void {
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
    default:
  }
}

assignJunctionStyleAngled(): void {
  this.junctionValue = LINECORNER.angled;
  this.junction = EMPTY_STRING;
}

assignJunctionStyleRounded(): void {
  this.junctionValue = LINECORNER.rounded;
  this.junction = EMPTY_STRING;
}

}
