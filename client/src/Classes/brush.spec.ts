import { TOOL } from '../constants';
import { Brush } from './brush';

const brush = new Brush(TOOL.brush, 'black', 'black', 5, 'filter');
const color = 'red';

describe('Brush', () => {

    it('Brush filter should be a string', () => {
        expect(brush.filter).toBe('filter');
    });

    it('Primary color is changed', () => {
        brush.changePrimaryColor(color);
        expect(brush.stroke).toBe('red');
    });

    it('Secondary color is not modified', () => {
        brush.changeSecondaryColor(color);
        expect(brush.stroke).toBe('black');
    });

});
