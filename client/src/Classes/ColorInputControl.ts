import { NB } from '../constants';

export class ColorInputControl {

    colorAccepted(s: string): boolean {
        return (this.checkChar(s) && this.checkLength(s));
    }

    private checkLength(s: string): boolean {
        return (s.length === NB.Six);
    }

    private checkChar(s: string): boolean {
        const letters: RegExp = /[0-9a-fA-F]/;
        return (letters.test(s));
    }
}
