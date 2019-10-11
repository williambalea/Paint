import { Component,  ElementRef , HostListener, Input, OnInit, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, NB, POINTER_EVENT, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

@Component({
  selector: 'app-drawing-space',
  templateUrl: './drawing-space.component.html',
  styleUrls: ['./drawing-space.component.scss'],
})
export class DrawingSpaceComponent implements OnInit, OnDestroy {
  

  @ViewChild('canvas', {static: false}) canvas: ElementRef;


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
               private renderer: Renderer2,
               private unsubscribeService : UnsubscribeService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.pointerEvent = POINTER_EVENT.visiblePainted;
  
  }

  test(): void {
    console.log('click');
  }

  setCanvasParameters(): void {
    this.unsubscribeService.subscriptons.push(this.fileParameters.canvaswidth$
       .subscribe((canvasWidth) => this.canvasWidth = canvasWidth));

    this.unsubscribeService.subscriptons.push(this.fileParameters.canvasheight$
       .subscribe((canvasHeight) => this.canvasHeight = canvasHeight));

    this.unsubscribeService.subscriptons.push(this.fileParameters.resizeflag$
       .subscribe((resizeFlag) => this.resizeFlag = resizeFlag));
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  ngOnDestroy(): void {
    this.unsubscribeService.onDestroy();
  }

  // TODO: Ines, elle sert à quoi cette fonction?
  // @HostListener('window:resize', ['$event'])
  // onResize(event: { target: { innerWidth: number; }; }): void {
  //   if (!this.resizeFlag) {
  //   this.width = event.target.innerWidth;
  //   this.canvasWidth = event.target.innerWidth;
  // }}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = true;
      this.selectedShape.onMouseMove();
      event.preventDefault();
    }

    if (event.key === KEY.alt) {
      this.inputService.altPressed = true;
      event.preventDefault();
    }
    console.log('hello');
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    if (event.key === KEY.shift) {
      this.inputService.shiftPressed = false;
      this.selectedShape.onMouseMove();
    }

    if (event.key === KEY.alt) {
      this.inputService.altPressed = false;
    }
    console.log('hellna');
  }

  changeFillColor(event: MouseEvent, shape: any): void {
    if (this.selectedTool === TOOL.colorApplicator) {
      event.preventDefault();
      this.renderer.setStyle(shape, 'fill', this.colorService.getFillColor());
    }
  }

  changeStrokeColor(event: MouseEvent, shape: any, color: string): void {
    event.preventDefault();
    if (this.selectedTool === TOOL.colorApplicator) {
      this.renderer.setStyle(shape, 'stroke', color);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(): void {
    const shape: any = this.selectedShape.onMouseDown();
    if (this.selectedTool === TOOL.rectangle || this.selectedTool === TOOL.ellipse) {
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
      this.renderer.listen(shape, 'contextmenu', (event: MouseEvent) => {
        event.preventDefault();
      });
    }
    if (this.selectedTool !== TOOL.colorApplicator) {
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

  @HostListener('wheel', ['$event'])
  onwheel(event: WheelEvent): void {
    if (this.selectedTool === TOOL.stamp) {
      event.preventDefault();
      this.inputService.changeStampAngle(Math.sign(event.deltaY));
      console.log(this.inputService.stampAngle);
    }
  }
}
