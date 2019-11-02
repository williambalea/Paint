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
  renderPath(copiedNode: Node): void {
    this.renderer.setStyle(copiedNode, 'stroke', 'red');
    this.renderer.setAttribute(copiedNode, 'transform', 'translate(50, 50)');
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  }
  renderRectangle(copiedNode: Node, newX: number, newY: number): void {
    this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
    this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
    this.renderer.setStyle(copiedNode, 'fill', 'red');
    this.renderer.setStyle(copiedNode, 'stroke', 'blue');
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  }
  renderEllipse(copiedNode: Node, newX: number, newY: number): void {
    this.renderer.setAttribute(copiedNode, 'cx', (newX).toString());
    this.renderer.setAttribute(copiedNode, 'cy', (newY).toString());
    this.renderer.setStyle(copiedNode, 'fill', 'red');
    this.renderer.setStyle(copiedNode, 'stroke', 'blue');
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  }
  renderStamp(copiedNode: Node, newX: number, newY: number): void {
    this.renderer.setAttribute(copiedNode, 'x', (newX).toString());
    this.renderer.setAttribute(copiedNode, 'y', (newY).toString());
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  }
  renderPolygon(copiedNode: Node): void {
    this.renderer.setStyle(copiedNode, 'fill', 'red');
    this.renderer.setStyle(copiedNode, 'stroke', 'blue');
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, copiedNode);
  }
  controlC(): void {
    this.selectedItems = [];
    for (const item of this.selectorService.selectedShapes) {
        if (item.id !== 'canvas') {
            {
              this.selectedItems.push(item);
            }
        }
    }
    console.log(this.selectedItems);
    this.nbIncrements++;
  }
  controlX(): void {
    this.controlC();
    for (const item of this.selectedItems) {
      if (item.id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, item);
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
  }
  controlD(): void {
    let copiedNode: Node;
    for (const item of this.selectorService.selectedShapes) {
        if (item.nodeName === 'rect') {
          let newX: number;
          let newY: number;
          console.log(this.nbIncrementsReset);
          console.log(this.nbIncrements);
          newX = Number(item.getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(item.getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = item.cloneNode(true);
          console.log(copiedNode);

          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderRectangle(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'ellipse') {
          let newX: number;
          let newY: number;
          console.log(this.nbIncrementsReset);
          console.log(this.nbIncrements);
          newX = Number(item.getAttribute('cx')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(item.getAttribute('cy')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = item.cloneNode(true);

          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderEllipse(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'image') {
          copiedNode = item.cloneNode(false);
          let newX = Number(item.getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
          let newY = Number(item.getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderStamp(copiedNode, newX, newY);
  
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'path') {
          copiedNode = item.cloneNode(false);
          //if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderPath(copiedNode);
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        if (item.nodeName === 'polygon') {
          this.polygonArray = [];
          let polygonPoints: string[];
          let newPolygonPoints: string;
          let newX: number;
          let newY: number;
          const copiedNode = item.cloneNode(false) as SVGGraphicsElement;
          polygonPoints = (item.getAttribute('points') as string).substring(0,
                          (item.getAttribute('points') as string).length).split(' ');
          for (let j = 0; j < polygonPoints.length; j++) {
            this.polygonArray[j] = Number(polygonPoints[j]) + (NB.OneHundred * this.nbIncrements);
          }
          newPolygonPoints = this.polygonArray.join(' ');
          copiedNode.setAttribute('points', newPolygonPoints);

          // Bonne methode, pas bonnesvaleurs, on doit regarder x et y individuellement.
          newX = Math.min.apply(Math, this.polygonArray);
          newY = Math.min.apply(Math, this.polygonArray);
          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderPolygon(copiedNode);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
        }
      }
    this.nbIncrements++;
  }
  controlV(): void {
    let copiedNode: Node;
    let newX: number;
    let newY: number;
    for (const item of this.selectedItems) {
      if (item.nodeName === 'ellipse') {
          newX = Number(item.getAttribute('cx')) + (NB.OneHundred * this.nbIncrements);
          newY = Number(item.getAttribute('cy')) + (NB.OneHundred * this.nbIncrements);
          copiedNode = item.cloneNode(true);
          if (newX < this.canvasWidth && newY < this.canvasHeight) {
            this.renderEllipse(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 1;
            this.nbIncrementsReset++;
          }
          this.nbIncrements++;
      }
      if (item.nodeName === 'rect') {
        newX = Number(item.getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
        newY = Number(item.getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
        copiedNode = item.cloneNode(true);
        if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderRectangle(copiedNode, newX, newY);
        } else {
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
      if (item.nodeName === 'path') {
        copiedNode = item.cloneNode(false);
        //if (newX < this.canvasWidth && newY < this.canvasHeight) {
        this.renderPath(copiedNode);
        this.nbIncrements = 1;
        this.nbIncrementsReset++;
        this.includingBoxService.update();
      }
      if (item.nodeName === 'image') {
        copiedNode = item.cloneNode(false);
        newX = Number(item.getAttribute('x')) + (NB.OneHundred * this.nbIncrements);
        newY = Number(item.getAttribute('y')) + (NB.OneHundred * this.nbIncrements);
        if (newX < this.canvasWidth && newY < this.canvasHeight) {
          this.renderStamp(copiedNode, newX, newY);
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
      if (item.nodeName === 'polygon') {
        this.polygonArray = [];
        let polygonPoints: string[];
        let newPolygonPoints: string;
        const copiedNode = item.cloneNode(false) as SVGGraphicsElement;
        polygonPoints = (item.getAttribute('points') as string).substring(0,
                        (item.getAttribute('points') as string).length).split(' ');
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
          this.renderPolygon(copiedNode);
        } else {
          this.nbIncrements = 1;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
    }
  }
  delete(): void {
    for (const item of this.selectorService.selectedShapes) {
      if (item.id !== 'canvas') {
        this.renderer.removeChild(this.viewChildService.canvas.nativeElement, item);
      }
    }
    this.selectorService.selectedShapes = [];
    this.includingBoxService.clear();
  }
}
