import { ACTIONS } from 'src/constants';

export interface UndoRedoAction {
    action: ACTIONS;
    shape: SVGGraphicsElement;
    oldColor?: string;
    position?: string;
    rotation?: string;
}
