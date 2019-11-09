import { ACTIONS } from 'src/constants';

export interface UndoRedoAction {
    action: ACTIONS;
    shape?: SVGGraphicsElement;
    shapes?: SVGGraphicsElement[];
    oldColor?: string;
    position?: string;
    rotation?: string;
    increment?: number;
}
