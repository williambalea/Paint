import { TOOL } from '../constants';
import { Rectangle } from './rectangle';

const rectangle = new Rectangle(TOOL.rectangle, 1, 2, 3, 4, 'black', 'black', 5);
const color = 'white';

describe('Rectangle', () => {

    it('Rectangle fill should be a string', () => {
        expect(rectangle.fill).toBe('black');
    });

    it('Primary color should modify a string value', () => {
        rectangle.changePrimaryColor(color);
        expect(rectangle.fill).toBe('white');
    });

});
