import anime from 'animejs';
import * as utils from './utils';

const buttonAnimationOffset = 3;

export default class Typewriter {
    clickArea: Element;
    
    handleTop: Element;
    handleCenter: Element;
    handleBottom: Element;

    buttons: Element[];

    initialButtonPos: utils.Vector2;
    buttonAnimation: anime.AnimeInstance | null = null;

    constructor(selector: string) {
        let root = utils.querySelectorErr(selector);

        this.clickArea = utils.querySelectorErr(".typewriter-clickarea");
        this.handleTop = utils.querySelectorErr(".tw-handle-top");
        this.handleCenter = utils.querySelectorErr(".tw-handle-center");
        this.handleBottom = utils.querySelectorErr(".tw-handle-bottom");
        this.buttons = [...document.querySelectorAll(".tw-button")];

        this.initialButtonPos = utils.getTransformPosition(this.buttons[0]);
    }

    set onClick(action: ()=>void) {
        this.clickArea.addEventListener("click", action);
    }

    public animateButtons() {
        if(!this.buttonAnimation || this.buttonAnimation.completed) {
            const x = this.initialButtonPos.x;
            const y = this.initialButtonPos.y + buttonAnimationOffset;
            const targets = utils.randomSort(utils.randomFilter(this.buttons));
            const duration = 200 / targets.length;
            this.buttonAnimation = anime({
                targets,
                delay: (button, index , length) => index * duration,
                transform: `translate(${x},${y})`,
                direction: "alternate",
                easing: "easeOutQuad",
                duration
            });
        }
    }
}