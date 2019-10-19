import { TOOL } from '../../constants';
import { Pen } from './pen';

const pen = new Pen(TOOL.pen, 'black', 'black', 5);
const color = 'red';

describe('Pen', () => {

    it('Pen path should be a string', () => {
        expect(pen.path).toBe('black');
    });

    it('Primary color is changed', () => {
        pen.changePrimaryColor(color);
        expect(pen.stroke).toBe('red');
    });

    it('Secondary color is not modified', () => {
        const penClone = pen;
        pen.changeSecondaryColor(color);
        expect(pen).toEqual(penClone);
    });

});
