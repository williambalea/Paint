import { Component,  ElementRef , HostListener, Input, OnInit, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import { ColorService } from 'src/app/services/color/color.service';
import { InputService } from 'src/app/services/input.service';
import { KEY, NB, POINTER_EVENT, STRINGS, TOOL } from '../../../constants';
import {FileParametersServiceService} from '../../services/file-parameters-service.service';
import { Shape } from '../../services/shapes/shape';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { CommunicationsService } from 'src/app/services/communications.service';
import { SVGJSON} from '../../../../../common/communication/SVGJSON';


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
  firstClick: boolean;
  pointerEvent: string;
  json = "<svg _ngcontent-had-c5=\"\" baseProfile=\"full\" id=\"canvas\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"909\" height=\"850\" style=\"background-color: rgb(255, 255, 255); pointer-events: visiblepainted;\"><defs _ngcontent-had-c5=\"\"><filter _ngcontent-had-c5=\"\" height=\"40px\" id=\"chalk\" width=\"50px\" x=\"-15px\" y=\"-15px\"><feTurbulence _ngcontent-had-c5=\"\" baseFrequency=\"0.08\" numOctaves=\"2\" result=\"turbulence\" type=\"turbulence\"></feTurbulence><feDisplacementMap _ngcontent-had-c5=\"\" in=\"SourceGraphic\" in2=\"turbulence\" scale=\"24\" xChannelSelector=\"R\" yChannelSelector=\"G\"></feDisplacementMap></filter><filter _ngcontent-had-c5=\"\" height=\"40px\" id=\"smear\" width=\"50px\" x=\"-15px\" y=\"-15px\"><feTurbulence _ngcontent-had-c5=\"\" baseFrequency=\"0.25 0.4\" numOctaves=\"3\" seed=\"5\" type=\"fractalNoise\"></feTurbulence><feComposite _ngcontent-had-c5=\"\" in=\"SourceGraphic\" in2=\"result5\" operator=\"in\"></feComposite><feMorphology _ngcontent-had-c5=\"\" operator=\"dilate\" radius=\"1.5\" result=\"result3\"></feMorphology><feTurbulence _ngcontent-had-c5=\"\" baseFrequency=\"0.03\" numOctaves=\"5\" seed=\"7\" type=\"fractalNoise\"></feTurbulence><feDisplacementMap _ngcontent-had-c5=\"\" in=\"result3\" in2=\"result91\" result=\"result4\" scale=\"27\" xChannelSelector=\"R\" yChannelSelector=\"G\"></feDisplacementMap></filter><filter _ngcontent-had-c5=\"\" height=\"40px\" id=\"rough\" width=\"50px\" x=\"-15px\" y=\"-15px\"><feTurbulence _ngcontent-had-c5=\"\" baseFrequency=\"0.1\" numOctaves=\"2\" result=\"turbulence\" type=\"turbulence\"></feTurbulence><feDisplacementMap _ngcontent-had-c5=\"\" in=\"SourceGraphic\" in2=\"turbulence\" scale=\"8\" xChannelSelector=\"R\" yChannelSelector=\"G\"></feDisplacementMap><feGaussianBlur _ngcontent-had-c5=\"\" stdDeviation=\"0.8\"></feGaussianBlur></filter><filter _ngcontent-had-c5=\"\" height=\"40px\" id=\"smooth\" width=\"50px\" x=\"-15px\" y=\"-15px\"><feGaussianBlur _ngcontent-had-c5=\"\" in=\"SourceGraphic\" result=\"result6\" stdDeviation=\"3.5 7.1\"></feGaussianBlur><feColorMatrix _ngcontent-had-c5=\"\" id=\"feColorMatrix226\" in=\"SourceGraphic\" result=\"result7\" values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 \"></feColorMatrix><feComposite _ngcontent-had-c5=\"\" in=\"result6\" in2=\"result7\" operator=\"in\"></feComposite></filter><filter _ngcontent-had-c5=\"\" height=\"40px\" id=\"bubbly\" width=\"50px\" x=\"-15px\" y=\"-25px\"><feTurbulence _ngcontent-had-c5=\"\" baseFrequency=\"0.058 0.932\" numOctaves=\"1\" result=\"result1\" seed=\"667\" stdDeviation=\"0.01 5.15\" type=\"fractalNoise\"></feTurbulence><feDisplacementMap _ngcontent-had-c5=\"\" in=\"SourceGraphic\" in2=\"result1\" result=\"fbSourceGraphic\" scale=\"20\" xChannelSelector=\"R\" yChannelSelector=\"G\"></feDisplacementMap></filter></defs><rect _ngcontent-had-c0=\"\" x=\"68\" y=\"105\" width=\"252\" height=\"290\" style=\"fill: rgb(0, 0, 0); stroke: rgb(255, 255, 255); stroke-width: 7;\"></rect><rect _ngcontent-had-c0=\"\" x=\"197\" y=\"477\" width=\"183\" height=\"194\" style=\"fill: rgb(0, 0, 0); stroke: rgb(255, 255, 255); stroke-width: 7;\"></rect><rect _ngcontent-had-c0=\"\"></rect><rect _ngcontent-had-c0=\"\"></rect><rect _ngcontent-had-c0=\"\" x=\"59\" y=\"4\" width=\"0\" height=\"0\" style=\"fill: rgb(0, 0, 0); stroke: rgb(255, 255, 255); stroke-width: 7;\"></rect></svg>";

  constructor( private fileParameters: FileParametersServiceService,
               private colorService: ColorService,
               private inputService: InputService,
               private renderer: Renderer2,
               private unsubscribeService: UnsubscribeService,
               private communicationService : CommunicationsService) {
    this.tool = TOOL;
    this.width = NB.Zero;
    this.resizeFlag = false;
    this.firstClick = true;
    this.pointerEvent = POINTER_EVENT.visiblePainted;

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

  usePipette(event: MouseEvent): void {
    const canvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.height = this.canvasHeight;
    canvas.width = this.canvasWidth;
    const image: HTMLImageElement = document.querySelectorAll('img')[1] as HTMLImageElement;
    const svg: SVGSVGElement = document.querySelector('svg') as SVGSVGElement;
    const xml: string = new XMLSerializer().serializeToString(svg as Node);
    const svg64: string = btoa(xml);
    const b64start = 'data:image/svg+xml;base64,';
    const image64: string = b64start + svg64;
    image.src = image64;
    (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).drawImage(image, 0, 0);
    const data: Uint8ClampedArray = (canvas.getContext(STRINGS.twoD) as CanvasRenderingContext2D).
    getImageData(event.offsetX, event.offsetY, 1, 1).data;
    if (event.button === 0 && !this.firstClick) {
      this.colorService.setFillColor('rgba(' + data[0].toString() + ',' + data[1].toString() + ',' + data[2] + ',' + data[3] + ')');
    }
    if (event.button === 2 && !this.firstClick) {
      this.colorService.setStrokeColor('rgba(' + data[0].toString() + ',' + data[1].toString() + ',' + data[2] + ',' + data[3] + ')');
    }
    this.firstClick = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.selectedTool === TOOL.pipette) {
      this.usePipette(event);
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

  @HostListener('wheel', ['$event'])
  onwheel(event: WheelEvent): void {
    if (this.selectedTool === TOOL.stamp) {
      event.preventDefault();
      this.inputService.changeStampAngle(Math.sign(event.deltaY));
      console.log(this.inputService.stampAngle);
    }
  }


  convertSVGtoJSON(): void {
        // TODO : get name and tag from input
        console.log('svg->json'); 
    const nom : string = 'image';
    const tag : string = 'mock';
    const picture : string ='test';

   
    const element = document.getElementById('canvas') as HTMLElement;
    const html = element.outerHTML;
    const data : SVGJSON = {
      name : nom,
      tag : tag,
      thumbnail : picture,
      html : html,
    };

    const json = JSON.stringify(data);
   
    this.communicationService.HTML = json;
    this.communicationService.postToServer(data).subscribe((response : any ) => {
      console.log('test',response);
    });
   // this.inputService.saveJSON(json);
  
  }
 

}
