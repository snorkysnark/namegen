import { a as anime } from './lib/anime.es.js';

function unwrap(nullable, error) {
    if (nullable !== null) {
        return nullable;
    }
    throw new Error(error);
}
function querySelectorErr(selector, description) {
    return unwrap(document.querySelector(selector), `Query failed: ${selector}`);
}
function getCssTransformPosition(element) {
    const matrixString = window.getComputedStyle(element).transform;
    const martix = matrixString.match(/[-]?\d+(\.\d+)?/g); //positive or negative floating point numbers
    let x = 0;
    let y = 0;
    if (martix && martix.length == 6) {
        x = +martix[4];
        y = +martix[5];
    }
    return { x, y };
}
function getSvgTransformPosition(element) {
    const matrix = element.transform.baseVal.getItem(0).matrix;
    let x = matrix.e;
    let y = matrix.f;
    return { x, y };
}
function randomFilter(array) {
    return array.filter((a) => Math.random() > 0.5);
}
function randomSort(array) {
    return array.sort((a, b) => Math.random() - 0.5);
}

const handleAnimationDuration = 150;
const buttonAnimationDuration = 200;
const buttonAnimationOffset = 3;
class Typewriter {
    constructor(selector) {
        this.buttonAnimation = null;
        let root = querySelectorErr(selector);
        this.clickArea = querySelectorErr(".typewriter-clickarea");
        this.handleTop = querySelectorErr(".tw-handle-top");
        this.handleCenter = querySelectorErr(".tw-handle-center");
        this.buttons = [...document.querySelectorAll(".tw-button")];
        this.initialButtonPos = getSvgTransformPosition(this.buttons[0]);
    }
    set onClick(action) {
        this.clickArea.addEventListener("click", action);
    }
    animateButtons() {
        if (!this.buttonAnimation || this.buttonAnimation.completed) {
            const x = this.initialButtonPos.x;
            const y = this.initialButtonPos.y + buttonAnimationOffset;
            const targets = randomSort(randomFilter(this.buttons));
            const duration = buttonAnimationDuration / targets.length;
            this.buttonAnimation = anime({
                targets,
                delay: (button, index, length) => index * duration,
                transform: `translate(${x},${y})`,
                direction: "alternate",
                easing: "easeOutQuad",
                duration
            });
        }
    }
    animateHandle() {
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
                { transform: "translate(0 10) scale(1 0)" },
                { transform: "translate(0 8.5) scale(1 1)" }
            ],
            duration
        });
    }
}

class Paper {
    constructor(selector) {
        this.container = querySelectorErr(selector);
        this.initialTranslation = getCssTransformPosition(this.container).y;
    }
    pushWord(word) {
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

const paper = new Paper("#paper");
const typewriter = new Typewriter("#typewriter");
const sound = new Audio("type.wav");
typewriter.onClick = () => {
    sound.currentTime = 0;
    sound.play();
    typewriter.animateButtons();
    typewriter.animateHandle();
    paper.pushWord("name");
};
