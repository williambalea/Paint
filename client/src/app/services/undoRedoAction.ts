import { ACTIONS } from 'src/constants';

export interface UndoRedoAction {
    shape : SVGGraphicsElement;
    action : ACTIONS;
    color?: string;
    position? :string;
    rotation? : string;
}