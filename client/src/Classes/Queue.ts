export class Queue<T> {

    constructor() {
        this.store = [];
    }
    store: T[];

    push(val: T) {
        if (this.store.length === 10) {
            this.pop();
        }
        if (this.store.indexOf(val) === -1) {
            this.store.push(val);
        }
    }

    pop(): T | undefined {
      return this.store.shift();
    }

    get(index: number): T | undefined {
        return this.store[index];
    }
}
