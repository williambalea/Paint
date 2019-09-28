import { NB } from '../constants';

export class ColorQueue<T> {
    store: T[];

    constructor(val: T) {
        this.store = [val, val, val, val, val, val, val, val, val, val];
    }

    push(val: T) {
        if (this.store.indexOf(val) === NB.MinusOne) {
            if (this.store.length === NB.Ten) {
                this.pop();
            }
            this.store.push(val);
        }
    }

    private pop(): T | undefined {
      return this.store.shift();
    }

    get(index: number): T {
        return this.store[index];
    }

    getLength(): number {
        return this.store.length;
    }
}
