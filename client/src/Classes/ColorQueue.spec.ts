import { ColorQueue } from './ColorQueue';

const queue: ColorQueue<number> = new ColorQueue();
const copy: ColorQueue<number> = new ColorQueue();

describe('ColorQueue', () => {
    it('Should add correctly 10 different elements', () => {
        for (let index = 0; index < 10; index++) {
            queue.push(index);
        }
        expect(queue.getLength()).toEqual(10);
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
