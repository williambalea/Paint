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
    for (const item of this.selectorService.selectedShapes) {
      if (item.id !== 'canvas') {
        shapeCounter = true;
      }
    }
    if (shapeCounter) {
      return true;
    } else {
      return false;
    }
  }

  writeTranslate(): string {
    let shiftX: number;
    let shiftY: number;
    if (this.nbIncrements > 0) {
      shiftX = this.nbIncrements * 50;
      shiftY = this.nbIncrements * 50;
    } else {
      shiftX = 50;
      shiftY = 50;
    }
    return 'translate(' + shiftX + ', ' + shiftY + ')';
  }

  verifyTranslationCoordinates(copiedNode: SVGGraphicsElement): boolean {
    const copiedNodeData = copiedNode as SVGGraphicsElement;
    const value = copiedNodeData.getBoundingClientRect() as DOMRect;
    console.log(value.top);
    if (copiedNodeData.getBoundingClientRect().top > this.canvasHeight || copiedNodeData.getBoundingClientRect().left > this.canvasWidth) {
      return false;
    } else {
      return true;
    }
  }

  renderPath(copiedNode: Node): void {
    let newNode: Node;
    newNode = copiedNode.cloneNode(true);
    this.renderer.setStyle(newNode, 'stroke', 'red');
    this.renderer.setAttribute(newNode, 'transform', this.writeTranslate());
    this.renderer.appendChild(this.viewChildService.canvas.nativeElement, newNode);
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
    this.nbIncrements = 0;
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
    let copiedNode: SVGGraphicsElement;
    let newX: number;
    let newY: number;
    for (const item of this.selectorService.selectedShapes) {
        if (item.nodeName === 'rect') {
          newX = Number(item.getAttribute('x')) + (NB.Fifteen * this.nbIncrements);
          newY = Number(item.getAttribute('y')) + (NB.Fifteen * this.nbIncrements);
          copiedNode = item.cloneNode(true) as SVGGraphicsElement;
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderRectangle(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'ellipse') {
          newX = Number(item.getAttribute('cx')) + (NB.Fifteen * this.nbIncrements);
          newY = Number(item.getAttribute('cy')) + (NB.Fifteen * this.nbIncrements);
          copiedNode = item.cloneNode(true) as SVGGraphicsElement;
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderEllipse(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'image') {
          copiedNode = item.cloneNode(false) as SVGGraphicsElement;
          newX = Number(item.getAttribute('x')) + (NB.Fifteen * this.nbIncrements);
          newY = Number(item.getAttribute('y')) + (NB.Fifteen * this.nbIncrements);
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderStamp(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'path') {
          copiedNode = item.cloneNode(false) as SVGGraphicsElement;
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderPath(copiedNode);
          } else {
          this.nbIncrements = 0;
          this.nbIncrementsReset++;
          }
        }
        if (item.nodeName === 'polygon') {
          this.polygonArray = [];
          let polygonPoints: string[];
          let newPolygonPoints: string;
          copiedNode = item.cloneNode(false) as SVGGraphicsElement;
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
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderPolygon(copiedNode);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
        }
      }
    this.nbIncrements++;
  }
  controlV(): void {
    let copiedNode: SVGGraphicsElement;
    let newX: number;
    let newY: number;
    for (const item of this.selectedItems) {
      if (item.nodeName === 'ellipse') {
          newX = Number(item.getAttribute('cx')) + (NB.Fifteen * this.nbIncrements);
          newY = Number(item.getAttribute('cy')) + (NB.Fifteen * this.nbIncrements);
          copiedNode = item.cloneNode(true) as SVGGraphicsElement;
          if (this.verifyTranslationCoordinates(copiedNode)) {
            this.renderEllipse(copiedNode, newX, newY);
          } else {
            this.nbIncrements = 0;
            this.nbIncrementsReset++;
          }
          this.nbIncrements++;
      }
      if (item.nodeName === 'rect') {
        newX = Number(item.getAttribute('x')) + (NB.Fifteen * this.nbIncrements);
        newY = Number(item.getAttribute('y')) + (NB.Fifteen * this.nbIncrements);
        copiedNode = item.cloneNode(false) as SVGGraphicsElement;
        if (this.verifyTranslationCoordinates(copiedNode)) {
          this.renderRectangle(copiedNode, newX, newY);
        } else {
          this.nbIncrements = 0;
          this.nbIncrementsReset++;
        }
        this.nbIncrements++;
      }
      if (item.nodeName === 'path') {
        copiedNode = item.cloneNode(false) as SVGGraphicsElement;
        if (this.verifyTranslationCoordinates(copiedNode)) {
          this.renderPath(copiedNode);
        } else {
        this.nbIncrements = 0;
        this.nbIncrementsReset++;
        }
      }
      if (item.nodeName === 'image') {
        copiedNode = item.cloneNode(false) as SVGGraphicsElement;
        newX = Number(item.getAttribute('x')) + (NB.Fifteen * this.nbIncrements);
        newY = Number(item.getAttribute('y')) + (NB.Fifteen * this.nbIncrements);
        if (this.verifyTranslationCoordinates(copiedNode)) {
          this.renderStamp(copiedNode, newX, newY);
          this.nbIncrements++;
        } else {
          this.nbIncrements = 0;
          this.nbIncrementsReset = 0;
        }
      }
      if (item.nodeName === 'polygon') {
        this.polygonArray = [];
        let polygonPoints: string[];
        let newPolygonPoints: string;
        copiedNode = item.cloneNode(false) as SVGGraphicsElement;
        polygonPoints = (item.getAttribute('points') as string).substring(0,
                        (item.getAttribute('points') as string).length).split(' ');
        for (let j = 0; j < polygonPoints.length; j++) {
          this.polygonArray[j] = Number(polygonPoints[j]) + (NB.Fifteen * this.nbIncrements);
        }
        newPolygonPoints = this.polygonArray.join(' ');
        copiedNode.setAttribute('points', newPolygonPoints);
        newX = Math.min.apply(Math, this.polygonArray);
        newY = Math.min.apply(Math, this.polygonArray);
        if (this.verifyTranslationCoordinates(copiedNode)) {
          this.renderPolygon(copiedNode);
        } else {
          this.nbIncrements = 0;
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
