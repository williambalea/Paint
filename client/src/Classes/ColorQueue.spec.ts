import { ColorQueue } from './ColorQueue';

describe('ColorQueue', () => {
    const val = 1;
    const queue: ColorQueue<number> = new ColorQueue(val);
    const copy: ColorQueue<number> = new ColorQueue(val);

    it('Should add correctly 10 different elements', () => {
        for (let index = 0; index < 10; index++) {
            queue.push(index);
        }
        expect(queue.getLength()).toEqual(10);
    });

    it('Should return value from queue correctly', () => {
        expect(queue.get(5)).toBeDefined();
    });

    it('Adding one element should not make length more thant 10', () => {
        queue.push(11);
        expect(queue.getLength()).toBeLessThanOrEqual(10);
    });

    copy.store = queue.store;
    it('Adding an existing element changes nothing', () => {
        queue.push(0);
        expect(copy.store === queue.store).toBeTruthy();
    });
});
