import { Component,  ElementRef , HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, NB, POINTER_EVENT, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit {

  @ViewChild('canvas', {static: false})
  canvas: ElementRef;

  tool: typeof TOOL;
  @Input()selectedTool: TOOL;
  @Input()selectedShape: Shape;
  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  pointerEvent: string;

  constructor( private fileParameters: FileParametersServiceService,
               private colorService: ColorService,
               private inputService: InputService,
               private renderer: Renderer2) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.pointerEvent = POINTER_EVENT.visiblePainted;
  }

  setCanvasParameters(): void {
    this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth);
    this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight);
    this.fileParameters.resizeflag$
       .subscribe((resizeFlag) => this.resizeFlag = resizeFlag);
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = true;
      this.selectedShape.onMouseMove();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = false;
      this.selectedShape.onMouseMove();
    }
  }

  changeFillColor(event: MouseEvent, shape: any): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      this.renderer.setStyle(shape, 'fill', this.colorService.getFillColor());
    }
  }

  changeStrokeColor(event: MouseEvent, shape: any, color: string): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      this.renderer.setStyle(shape, 'stroke', color);
    }
  }

  setElementColor(event: MouseEvent, primaryColor: string, secondaryColor?: string): void {
    if (event.button === 0) {
      this.colorService.setFillColor(primaryColor);
    }
    if (event.button === 2 && secondaryColor) {
      this.colorService.setStrokeColor(secondaryColor);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.selectedTool === TOOL.pipette) {
      const element: HTMLElement = event.target as HTMLElement;
      const style: string[] = (element.getAttribute('style') as string).split(';');
      switch (element.tagName) {
        case 'path':
          this.setElementColor(event, style[0].substring(8));
          break;

        case 'svg':
          this.setElementColor(event, style[0].substring(18));
          break;

        case 'rect':
          this.setElementColor(event, style[0].substring(6), style[1].substring(9));
          break;

        default:
          return;
      }
    }
    const shape: any = this.selectedShape.onMouseDown();
    this.setEventListeners(shape);
    this.draw(shape);
  }

    setEventListeners(shape: any): void {
    if (this.selectedTool === TOOL.rectangle) {
      this.renderer.listen(shape, 'click', (event: MouseEvent) => {
        this.changeFillColor(event, shape);
      });
      this.renderer.listen(shape, 'contextmenu', (event: MouseEvent) => {
        this.changeStrokeColor(event, shape, this.colorService.getStrokeColor());
      });
    }
    if (this.selectedTool === TOOL.brush || this.selectedTool === TOOL.pen) {
      this.renderer.listen(shape, 'click', (event: MouseEvent) => {
        this.changeStrokeColor(event, shape, this.colorService.getFillColor());
      });
    }
  }

  draw(shape: any): void {
    if (this.selectedTool !== TOOL.colorApplicator && this.selectedTool !== TOOL.pipette) {
      this.renderer.appendChild(this.canvas.nativeElement, shape);
      this.inputService.isBlank = false;
      this.colorService.setMakingColorChanges(false);
      this.pointerEvent = POINTER_EVENT.none;
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.selectedTool !== TOOL.colorApplicator) {

    this.inputService.setMouseOffset(event);
    this.selectedShape.onMouseMove();
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (this.selectedTool !== TOOL.colorApplicator) {

    this.selectedShape.onMouseUp();
    this.pointerEvent = POINTER_EVENT.visiblePainted;
    }
  }

}
