import { TOOL } from '../../constants';
import { Rectangle } from './rectangle';

const rectangle = new Rectangle(TOOL.rectangle, 1, 2, 3, 4, 'black', 'black', 5);
const fill = 'white';
const stroke = 'red';

describe('Rectangle', () => {

    it('Rectangle fill should be a string', () => {
        expect(typeof(rectangle.fill)).toBe(typeof(fill));
    });

    it('Primary color should modify a string value', () => {
        rectangle.changePrimaryColor(fill);
        expect(rectangle.fill).toBe('white');
    });

    it('Secondary color should modify a string value', () => {
        rectangle.changeSecondaryColor(stroke);
        expect(rectangle.stroke).toBe('red');
    });

});
