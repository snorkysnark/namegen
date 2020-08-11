import {querySelectorErr} from './utils';

export default class Typewriter {
    clickArea: Element;
    
    handleTop: Element;
    handleCenter: Element;
    handleBottom: Element;

    buttons: Element[];

    constructor(selector: string) {
        let root = querySelectorErr(selector);

        this.clickArea = querySelectorErr(".typewriter-clickarea");
        this.handleTop = querySelectorErr(".tw-handle-top");
        this.handleCenter = querySelectorErr(".tw-handle-center");
        this.handleBottom = querySelectorErr(".tw-handle-bottom");
        this.buttons = [...document.querySelectorAll(".tw-button")];
    }

    public setOnClick(action: ()=>void) {
        this.clickArea.addEventListener("click", action);
    }
}