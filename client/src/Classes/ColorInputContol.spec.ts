import { ColorInputControl } from '../Classes/ColorInputControl';

const controlInputControl: ColorInputControl = new ColorInputControl();

describe('ColorAccepte function', () => {
    it('Should refuse a string with a length different than 6', () => {
        expect(controlInputControl.colorAccepted('1')).toBeFalsy();
    });
    it('Should refuse a string with a length equal to 6 but with illegal char', () => {
        expect(controlInputControl.colorAccepted('@@@@@@')).toBeFalsy();
    });
    it('Should accept a string with a length equal to 6 and no illegal char', () => {
        expect(controlInputControl.colorAccepted('F3A2C8')).toBeTruthy();
    });
});
