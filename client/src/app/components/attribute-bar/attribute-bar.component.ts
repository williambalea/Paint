import { Component, Input} from '@angular/core';
import { ShapesService } from '../../services/shapes/shapes.service'
import {Shape} from '../../services/shapes/classes/shape'
import {Rectangle} from '../../services/shapes/classes/rectangle'
import {Preview} from '../../../../../common/interface/preview'

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  @Input() test: number;

  shapeService:ShapesService;
  preview: Preview;

  currentShape:Shape;

  /* MAB: On veut une separation des attributs de chaque outil */
  // Shapes
  shapeStrokeColor: string;
  shapeFillColor: string;
  shapeStrokeWidth: Number;

  // Drawing Tools
  strokeColor:string;
  strokeWidth: number;
  fillColor:string;

  // Hide page
  show:boolean=true;
  rectangle: Rectangle = new Rectangle(1,2,3,4,"black","black",5);


assignType1Fill(){
  if(confirm("Are you sure you wish to chose type 1 fill ?")){
    // transparency  = 1;
    // currentStrokeColor = this.strokeColor;
  }
  return false;
}

assignType2Fill(){
  if(confirm("Are you sure you wish to chose type 2 fill ?")){
    // transparency  = 0;
    // currentStrokeColor = this.fillColor;
  }
  return false;
}

assignType3Fill(){
  if(confirm("Are you sure you wish to chose type 3 fill ?")){
    // transparency  = 0;
    // currentStrokeColor = this.shapeStrokeColor;
    // currentFillColor = this.shapeFillColor;
  }
  return false;
}

exitWindow(){
  /* MAB: Avoir l'option de collapse la window d'attribut si on veut, pas juste d'alterner entre fenetres une fois
     la premiere ouverte */
     if(confirm("Are you certain you wish to collapse this panel?")){
      this.show = !this.show;
     }     
}


assignStrokeWidth(value:Number){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.shapeStrokeWidth = value;
  }
  return false;
}

/* MAB: Besoin de binder ces 2 fonctions avec l'interface de couleurs et les couleurs des rectangles. */

assignStrokeColor(value:string){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.shapeStrokeColor = value;
  }
  return false;
}

// Exemple d'input confirmation
assignFillColor(value:string){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.shapeFillColor = value;
  }
  return false;
}

assignPrimaryColor(value:string){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.strokeColor=value;
  }
  return false;
}

assignSecondaryColor(value:string){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.fillColor = value;
  }
  return false;
}

assignDrawStrokeWidth(value:number){
  console.log(value);
  if(confirm("Are you sure you wish to enter: "+value+" ?")){
    this.strokeWidth=value;
  }
  return false;
}
/* MAB: Tentative pour l'acces aux parametres d'une shape dans l'array.
        Probablement utilise lorsqu'il sera question de modifier des attributs 
        d'une forme existante. */

accessShape(index:number): Shape{
let currentRectangle: Shape = this.shapeService.shapes[index];
return currentRectangle
}

}



