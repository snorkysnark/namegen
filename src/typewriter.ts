import anime from 'animejs';
import {errorChecked, transform, random, Vector2} from './utils';

const handleAnimationDuration = 150;
const buttonAnimationDuration = 200;

const buttonAnimationOffset = 3;

export default class Typewriter {
    clickArea: Element;
    
    handleTop: SVGAElement;
    handleCenter: SVGAElement;

    buttons: SVGAElement[];

    initialButtonPos: Vector2;
    buttonAnimation: anime.AnimeInstance | null = null;

    constructor(selector: string) {
        let root = errorChecked.query(selector);

        this.clickArea = errorChecked.query(".typewriter-clickarea");
        this.handleTop = errorChecked.query(".tw-handle-top") as SVGAElement;
        this.handleCenter = errorChecked.query(".tw-handle-center") as SVGAElement;
        this.buttons = [...document.querySelectorAll(".tw-button")] as SVGAElement[];

        this.initialButtonPos = transform.getSvgPosition(this.buttons[0]);
    }

    set onClick(action: ()=>void) {
        this.clickArea.addEventListener("click", action);
    }

    public animateButtons() {
        if(!this.buttonAnimation || this.buttonAnimation.completed) {
            const x = this.initialButtonPos.x;
            const y = this.initialButtonPos.y + buttonAnimationOffset;
            const targets = random.sort(random.filter(this.buttons));
            const duration = buttonAnimationDuration / targets.length;
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

    public animateHandle() {
        const duration = handleAnimationDuration;
        this.handleTop.setAttribute("transform", "translate(0 0)");
        anime({
            targets: this.handleTop,
            transform: "translate(0 16)",
            easing: "linear",
            direction: "alternate",
            duration
        });
        this.handleCenter.setAttribute("transform", "translate(0 0) scale(1 1)");
        anime({
            targets: this.handleCenter,
            easing: "linear",
            direction: "alternate",
            keyframes: [
                {transform: "translate(0 10) scale(1 0)"},
                {transform: "translate(0 8.5) scale(1 1)"}
            ],
            duration
        });
    }
}