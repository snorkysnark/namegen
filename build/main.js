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
function getTransformPosition(element) {
    const matrixString = window.getComputedStyle(element).transform;
    const numbers = matrixString.match(/[-]?\d+/g);
    let x = 0;
    let y = 0;
    if (numbers && numbers.length == 6) {
        x = +numbers[4];
        y = +numbers[5];
    }
    return { x, y };
}

class Typewriter {
    constructor(selector) {
        let root = querySelectorErr(selector);
        this.clickArea = querySelectorErr(".typewriter-clickarea");
        this.handleTop = querySelectorErr(".tw-handle-top");
        this.handleCenter = querySelectorErr(".tw-handle-center");
        this.handleBottom = querySelectorErr(".tw-handle-bottom");
        this.buttons = [...document.querySelectorAll(".tw-button")];
    }
    setOnClick(action) {
        this.clickArea.addEventListener("click", action);
    }
}

class Paper {
    constructor(selector) {
        this.container = querySelectorErr(selector);
        this.initialTranslation = getTransformPosition(this.container).y;
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
typewriter.setOnClick(() => {
    paper.pushWord("click");
});
