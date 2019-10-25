import { TOOL } from '../../constants';
import { Pencil } from './pencil';

const pencil = new Pencil(TOOL.pencil, 'black', 'black', 5);
const color = 'red';

describe('Pencil', () => {

    it('Pencil path should be a string', () => {
        expect(pencil.path).toBe('black');
    });

    it('Primary color is changed', () => {
        pencil.changePrimaryColor(color);
        expect(pencil.stroke).toBe('red');
    });

    it('Secondary color is not modified', () => {
        const pencilClone = pencil;
        pencil.changeSecondaryColor(color);
        expect(pencil).toEqual(pencilClone);
    });

});
