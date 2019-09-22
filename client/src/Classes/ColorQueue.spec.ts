import { ColorQueue } from './ColorQueue';

// tslint:disable: prefer-const
let queue: ColorQueue<number> = new ColorQueue();
let copy: ColorQueue<number> = new ColorQueue();

describe('ColorQueue', () => {
    it('Should add correctly 10 different elements', () => {
        for (let index = 0; index < 10; index++) {
            queue.push(index);
        }
        expect(queue.getLength()).toEqual(10);
    });

    it('Adding one element keeps length equal to 10', () => {
        queue.push(11);
        expect(queue.getLength()).toBe(10);
    });

    copy.store = queue.store;
    it('Adding an existing element changes nothing', () => {
        queue.push(0);
        expect(copy.store === queue.store).toBeTruthy();
    });

});
