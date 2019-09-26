import { TOOL } from '../constants';
import { Pen } from './pen';

const pen = new Pen(TOOL.pen, 'black', 'black', 5);
const color = 'red';

describe('Pen', () => {

    it('Rectangle fill should be a string', () => {
        expect(pen.path).toBe('pen');
    });

    it('Primary color is changed', () => {
        pen.changePrimaryColor(color);
        expect(pen.stroke).toBe('red');
    });

    it('Secondary color is not modified', () => {
        pen.changeSecondaryColor(color);
        expect(pen.stroke).toBe('black');
    });

});
