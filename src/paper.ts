import anime from 'animejs';
import {errorChecked, transform} from './utils';

export default class Paper {
    container: HTMLElement;
    initialTranslation: number;

    constructor(selector: string) {
        this.container = errorChecked.query(selector) as HTMLElement;
        this.initialTranslation = transform.getCssPosition(this.container).y;
    }

    public pushWord(word: string) {
        const element = document.createElement("div");
        element.innerHTML = word;
        element.className = "name";
        this.container.appendChild(element);
        
        const textHeight = element.offsetHeight;
        this.container.style.transform = `translateY(${this.initialTranslation + textHeight}px)`;
        anime({
            targets: this.container,
            translateY: this.initialTranslation,
            easing: "linear",
            duration: 100
        });
    }
}