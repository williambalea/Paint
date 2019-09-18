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

  currentStrokeColor: string;
  currentFillColor: string;
  currentStrokeWidth: Number;

  /* 
  currentFillType: 

    MAB: On va devoir definir comment on ajuste les parametres currentStrokeWidth et 
         currentFillColor en fonction du type de filling choisi. Probablement simplement
         question de mettre stroke width = 0 dans un cas, fill color a transparent dans
         l'autre.
  */



  rectangle: Rectangle = new Rectangle(1,2,3,4,"black","black",5);


confirmInput(){
  window.alert("Are you sure you wish to enter: " + "PLACEHOLDER" + " ?");

}

exitWindow(){
  /* MAB: Avoir l'option de collapse la window d'attribut si on veut, pas juste d'alterner entre fenetres une fois
     la premiere ouverte */
     window.alert("Are you certain you wish to collapse this panel?");
}


assignStrokeWidth(value:Number){
  console.log(value);
  this.currentStrokeWidth = value;
  return false;
}

/* MAB: Besoin de binder ces 2 fonctions avec l'interface de couleurs et les couleurs des rectangles. */

assignStrokeColor(value:string){
  console.log(value);
  this.currentStrokeColor = value;
  return false;
}

assignFillColor(value:string){
  console.log(value);
  this.currentFillColor = value;
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



