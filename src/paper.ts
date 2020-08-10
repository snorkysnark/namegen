import KUTE from 'kute.js';
import {querySelectorErr, div} from './utils';

export default class Paper {
    container: HTMLElement;

    constructor(selector: string) {
        this.container = querySelectorErr(selector) as HTMLElement;
    }

    public pushWord(word: string) {
        const element = div(word, {class: "name"});
        this.container.appendChild(element);
        KUTE.fromTo(this.container, {translateY: 66}, {translateY: 41}, {duration: 100}).start();
    }
}