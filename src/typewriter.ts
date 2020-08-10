import {querySelectorErr} from './utils';

export default class Typewriter {
    handleTop: Element;
    handleCenter: Element;
    handleBottom: Element;

    buttons: Element[];

    constructor(selector: string, onClick?: () => void) {
        let root = querySelectorErr(selector);
        let clickArea = querySelectorErr(".typewriter-clickarea");

        this.handleTop = querySelectorErr(".tw-handle-top");
        this.handleCenter = querySelectorErr(".tw-handle-center");
        this.handleBottom = querySelectorErr(".tw-handle-bottom");
        this.buttons = [...document.querySelectorAll(".tw-button")];

        if(onClick)
        {
            clickArea.addEventListener("click", onClick);
        }
    }
}