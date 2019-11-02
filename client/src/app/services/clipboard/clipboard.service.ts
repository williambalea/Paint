import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { NB } from 'src/constants';
import { FileParametersServiceService } from '../file-parameters-service.service';
import { IncludingBoxService } from '../includingBox/including-box.service';
import { SelectorService } from '../selector/selector.service';
import { UnsubscribeService } from '../unsubscribe.service';
import { ViewChildService } from '../view-child.service';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService implements OnInit {

  renderer: Renderer2;
  selectedItems: SVGGraphicsElement[];
  memoryShapes: SVGGraphicsElement[];
  polygonArray: number[];

  getElementMouseDown: boolean;
  controlCMode: boolean;
  controlXMode: boolean;
  controlVMode: boolean;
  nbIncrements: number;
  nbIncrementsReset: number;

  resizeFlag: boolean;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private selectorService: SelectorService,
              private viewChildService: ViewChildService,
              private rendererFactory: RendererFactory2,
              private includingBoxService: IncludingBoxService,
              private fileParameterService: FileParametersServiceService,
              private unsubscribeService: UnsubscribeService) {
    this.selectedItems = [];
    this.memoryShapes = [];
    this.polygonArray = [];

    this.nbIncrements = 1;
    this.nbIncrementsReset = 0;

    this.getElementMouseDown = false;
    this.controlCMode = false;
    this.controlVMode = false;
    this.controlVMode = false;
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.setCanvasParameters();
  }

  setCanvasParameters(): void {
    this.unsubscribeService.subscriptons.push(this.fileParameterService.canvaswidth$
      .subscribe((canvasWidth) => this.canvasWidth = canvasWidth));
    this.unsubscribeService.subscriptons.push(this.fileParameterService.canvasheight$
      .subscribe((canvasHeight) => this.canvasHeight = canvasHeight));
    this.unsubscribeService.subscriptons.push(this.fileParameterService.resizeflag$
      .subscribe((resizeFlag) => this.resizeFlag = resizeFlag));
  }

  findSelected(): boolean {
    if (this.selectorService.selectedShapes.length !== 0 && this.dismissCanvas()) {
      return true;
    } else {
      return false;
    }
  }

  clipboardEmpty(): boolean {
    if (this.selectedItems.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  dismissCanvas(): boolean {
    let shapeCounter = false;
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
      if (this.selectorService.selectedShapes[i].id !== 'canvas') {
        shapeCounter = true;
      }
    }
    if (shapeCounter) {
      return true;
    } else {
      return false;
    }
  }

  controlC(): void {
    this.selectedItems = [];
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
        if (this.selectorService.selectedShapes[i].id !== 'canvas') {
            {
              this.selectedItems.push(this.selectorService.selectedShapes[i]);
            }
        }
    }
    console.log(this.selectedItems);
    this.nbIncrements++;
  }

  controlX(): void {
    this.controlC();
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.selectedItems[i].id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, this.selectedItems[i]);
      }
    }
    this.selectorService.selectedShapes = [];
    this.includingBoxService.clear();
  }

  controlA(): void {
    this.selectedItems = [];
    this.selectedItems = this.viewChildService.canvas.nativeElement.children as SVGGraphicsElement[];
    const array = Array.from(this.selectedItems);

    this.selectedItems = array;
    this.selectorService.selectedShapes = array;
    this.includingBoxService.update();
    console.log(array);
  }

  controlD(): void {
    let copiedNode: Node;
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
        if (this.selectorService.selectedShapes[i].nodeName === 'rect') {
          let newX: number;
          let newY: number;
          console.log(this.nbIncrementsReset);
          console.log(this.nbIncrements);
          newX = Number(this.selectorService.selectedShapes[i].getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(this.selectorService.selectedShapes[i].getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = this.selectorService.selectedShapes[i].cloneNode(true);
          console.log(copiedNode);

          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
            this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
            this.renderer.setStyle(copiedNode, 'fill', 'red');
            this.renderer.setStyle(copiedNode, 'stroke', 'blue');
            this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
        }
        if (this.selectorService.selectedShapes[i].nodeName === 'ellipse') {
          let newX: number;
          let newY: number;
          console.log(this.nbIncrementsReset);
          console.log(this.nbIncrements);
          newX = Number(this.selectorService.selectedShapes[i].getAttribute('cx')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(this.selectorService.selectedShapes[i].getAttribute('cy')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = this.selectorService.selectedShapes[i].cloneNode(true);

          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderer.setAttribute(copiedNode, 'cx', (newX).toString());
            this.renderer.setAttribute(copiedNode, 'cy', (newY).toString());
            this.renderer.setStyle(copiedNode, 'fill', 'red');
            this.renderer.setStyle(copiedNode, 'stroke', 'blue');
            this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
        }
        if (this.selectorService.selectedShapes[i].nodeName === 'image') {
          copiedNode = this.selectorService.selectedShapes[i].cloneNode(false);
          let newX = Number(this.selectorService.selectedShapes[i].getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
          let newY = Number(this.selectorService.selectedShapes[i].getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
          
          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
            this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
            this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
            this.includingBoxService.update();
          }
        }
        if (this.selectorService.selectedShapes[i].nodeName === 'path') {

          copiedNode = this.selectorService.selectedShapes[i].cloneNode(false);

          //if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderer.setStyle(copiedNode, 'stroke', 'red');
          this.renderer.setAttribute(copiedNode, 'transform', 'translate(50, 50)');
          this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        if (this.selectorService.selectedShapes[i].nodeName === 'polygon') {
          this.polygonArray = [];
          let polygonPoints: string[];
          let newPolygonPoints: string;
          let newX: number;
          let newY: number;
          let copiedNode = this.selectorService.selectedShapes[i].cloneNode(false) as SVGGraphicsElement;
          polygonPoints = (this.selectorService.selectedShapes[i].getAttribute('points') as string).substring(0,
                          (this.selectorService.selectedShapes[i].getAttribute('points') as string).length).split(' ');
          for (let j = 0; j < polygonPoints.length; j++) {
            this.polygonArray[j] = Number(polygonPoints[j]) + (NB.OneHundred * this.nbIncrements);
          }
          newPolygonPoints = this.polygonArray.join(' ');
          copiedNode.setAttribute('points', newPolygonPoints);

          // Bonne methode, pas bonnesvaleurs, on doit regarder x et y individuellement.
          newX = Math.min.apply(Math, this.polygonArray);
          newY = Math.min.apply(Math, this.polygonArray);
          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderer.setStyle(copiedNode, 'fill', 'red');
            this.renderer.setStyle(copiedNode, 'stroke', 'blue');
            this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
        }
      }
    this.nbIncrements++;
  }

  delete(): void {
    for (let i = 0; i < this.selectorService.selectedShapes.length; i++) {
      if (this.selectorService.selectedShapes[i].id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, this.selectorService.selectedShapes[i]);
      }
    }
    this.selectorService.selectedShapes = [];
    this.includingBoxService.clear();
  }

  controlV(): void {
    let copiedNode: Node;
    for (let i = 0; i < this.selectedItems.length; i++) {
      if (this.selectedItems[i].nodeName === 'ellipse') {
          let newX: number;
          let newY: number;
          console.log(this.nbIncrementsReset);
          console.log(this.nbIncrements);
          newX = Number(this.selectedItems[i].getAttribute('cx')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(this.selectedItems[i].getAttribute('cy')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = this.selectedItems[i].cloneNode(true);

          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderer.setAttribute(copiedNode, 'cx', (newX).toString());
            this.renderer.setAttribute(copiedNode, 'cy', (newY).toString());
            this.renderer.setStyle(copiedNode, 'fill', 'red');
            this.renderer.setStyle(copiedNode, 'stroke', 'blue');
            this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
          this.nbIncrements++;
      }
      if (this.selectedItems[i].nodeName === 'rect') {
        let newX: number;
        let newY: number;
        newX = Number(this.selectedItems[i].getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
        newY = Number(this.selectedItems[i].getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
        copiedNode = this.selectedItems[i].cloneNode(true);

        if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
          this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
          this.renderer.setStyle(copiedNode, 'fill', 'red');
          this.renderer.setStyle(copiedNode, 'stroke', 'blue');
          this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
        } else {
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
      // if (this.clipboardService.selectedItems[i].nodeName === 'path') {
      //   let newX: number;
      //   let newY: number;
      //   console.log(this.nbIncrementsReset);
      //   console.log(this.nbIncrements);
      //   newX = Number(this.clipboardService.selectedItems[i].getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
      //   newY = Number(this.clipboardService.selectedItems[i].getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
      //   copiedNode = this.clipboardService.selectedItems[i].cloneNode(true);

      //   if (newX < this.canvasWidth && newY < this.canvasHeight) {
      //     this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
      //     this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
      //     this.renderer.setStyle(copiedNode, 'fill', 'red');
      //     this.renderer.setStyle(copiedNode, 'stroke', 'blue');
      //     this.renderer.appendChild(this.canvas.nativeElement, copiedNode);
      //   } else {
      //     this.nbIncrements = 1;
      //     this.nbIncrementsReset++;
      //   }
      // }
      if (this.selectedItems[i].nodeName === 'path') {
        copiedNode = this.selectedItems[i].cloneNode(false);

        //if (newX < this.canvasWidth && newY < this.canvasHeight) {
        this.renderer.setStyle(copiedNode, 'stroke', 'red');
        this.renderer.setAttribute(copiedNode, 'transform', 'translate(50, 50)');
        this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);

        this.nbIncrements = 1;
        this.nbIncrementsReset++;
        this.includingBoxService.update();
      }
      if (this.selectedItems[i].nodeName === 'image') {
        copiedNode = this.selectedItems[i].cloneNode(false);
        let newX = Number(this.selectedItems[i].getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
        let newY = Number(this.selectedItems[i].getAttribute('y')) + (NB.OneHundred * this.nbIncrements);

        if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
          this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
          this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);

          this.nbIncrements = 1;
          this.nbIncrementsReset++;
          this.includingBoxService.update();
        }
        this.nbIncrements++;
      }
      if (this.selectedItems[i].nodeName === 'polygon') {
        this.polygonArray = [];
        let polygonPoints: string[];
        let newPolygonPoints: string;
        let newX: number;
        let newY: number;
        const copiedNode = this.selectedItems[i].cloneNode(false) as SVGGraphicsElement;
        polygonPoints = (this.selectedItems[i].getAttribute('points') as string).substring(0,
                        (this.selectedItems[i].getAttribute('points') as string).length).split(' ');
        for (let j = 0; j < polygonPoints.length; j++) {
          this.polygonArray[j] = Number(polygonPoints[j]) + (NB.OneHundred * this.nbIncrements);
        }
        newPolygonPoints = this.polygonArray.join(' ');
        copiedNode.setAttribute('points', newPolygonPoints);

          //let xList: number[];
          //   let yList: number[];
            //  xList = [];
            //  yList = [];

        // Bonne methode, pas bonnesvaleurs, on doit regarder x et y individuellement.
        newX = Math.min.apply(Math, this.polygonArray);
        newY = Math.min.apply(Math, this.polygonArray);
        if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderer.setStyle(copiedNode, 'fill', 'red');
          this.renderer.setStyle(copiedNode, 'stroke', 'blue');
          this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
        } else {
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
    }
  }

}
