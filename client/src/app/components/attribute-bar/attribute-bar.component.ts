import { Component, Input} from '@angular/core';
import { ShapesService } from '../../services/shapes/shapes.service'
import {Rectangle} from '../../services/shapes/classes/rectangle'

@Component({
  selector: 'app-attribute-bar',
  templateUrl: './attribute-bar.component.html',
  styleUrls: ['./attribute-bar.component.scss'],
})

export class AttributeBarComponent {
  @Input() test: number;

  shapeService:ShapesService;

  rectangle: Rectangle = new Rectangle(1,2,3,4,"black","black",5);

  /* MAB: On va devoir ajuster les fonctions ci-dessous pour chacune des confirmations d'user input
          Problement devoir read le contenu d'un angular form, et caller ces confirmInput() à partir du submit button
  */

confirmInput(){
  window.alert("Are you sure you wish to enter: " + "PLACEHOLDER" + " ?");

}

exitWindow(){
  /* MAB: Avoir l'option de collapse la window d'attribut si on veut, pas juste d'alterner entre fenetres une fois
     la premiere ouverte */
     window.alert("Are you certain you wish to collapse this panel?");
}

/* MAB: Input confirmation for number and not string */

onSubmit(value:Number){
  window.alert(value);
  console.log(value);
  return false;
}

/* MAB: Besoin de binder ces 2 fonctions avec l'interface de couleurs et les couleurs des rectangles. */

assignPrimaryColor(){
  window.alert("Choose your primary color!");
}

assignSecondaryColor(){
  window.alert("Choose your secondary color!");
}
  
}

