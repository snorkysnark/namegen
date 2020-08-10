import { g as ge } from './lib/kute.esm.min.js';

function unwrap(nullable, error) {
    if (nullable !== null) {
        return nullable;
    }
    throw new Error(error);
}
function querySelectorErr(selector, description) {
    return unwrap(document.querySelector(selector), `Query failed: ${selector}`);
}
function div(content, options) {
    let element = document.createElement("div");
    element.innerHTML = content;
    if (options) {
        if (options.id)
            element.setAttribute("id", options.id);
        if (options.class)
            element.setAttribute("class", options.class);
    }
    return element;
}

class Typewriter {
    constructor(selector, onClick) {
        let root = querySelectorErr(selector);
        let clickArea = querySelectorErr(".typewriter-clickarea");
        this.handleTop = querySelectorErr(".tw-handle-top");
        this.handleCenter = querySelectorErr(".tw-handle-center");
        this.handleBottom = querySelectorErr(".tw-handle-bottom");
        this.buttons = [...document.querySelectorAll(".tw-button")];
        if (onClick) {
            clickArea.addEventListener("click", onClick);
        }
    }
}

class Paper {
    constructor(selector) {
        this.container = querySelectorErr(selector);
    }
    pushWord(word) {
        const element = div(word, { class: "name" });
        this.container.appendChild(element);
        ge.fromTo(this.container, { translateY: 66 }, { translateY: 41 }, { duration: 100 }).start();
    }
}

class App {
    constructor(typewriterSelector, paperSelector) {
        this.typewriter = new Typewriter(typewriterSelector, () => this.onTypewriterClick());
        this.paper = new Paper(paperSelector);
    }
    onTypewriterClick() {
        console.log("click");
        this.paper.pushWord("сосулька");
    }
}
new App("#typewriter", "#paper");
