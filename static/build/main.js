import { a as anime } from './lib/anime.es.js';

const errorChecked = {
    unwrap: function (nullable, error) {
        if (nullable !== null) {
            return nullable;
        }
        throw new Error(error);
    },
    query: function (selector) {
        return this.unwrap(document.querySelector(selector), `Query failed: ${selector}`);
    }
};
const transform = {
    getCssPosition: function (element) {
        const matrixString = window.getComputedStyle(element).transform;
        const martix = matrixString.match(/[-]?\d+(\.\d+)?/g); //positive or negative floating point numbers
        let x = 0;
        let y = 0;
        if (martix && martix.length == 6) {
            x = +martix[4];
            y = +martix[5];
        }
        return { x, y };
    },
    getSvgPosition: function (element) {
        const matrix = element.transform.baseVal.getItem(0).matrix;
        let x = matrix.e;
        let y = matrix.f;
        return { x, y };
    }
};
const random = {
    itemFrom: function (array) {
        return array[this.rangeInt(0, array.length)];
    },
    filter: function (array, atLeastOne) {
        let filtered = array.filter((a) => Math.random() > 0.5);
        if (atLeastOne && filtered.length === 0) {
            filtered = [this.itemFrom(array)];
        }
        return filtered;
    },
    sort: function (array) {
        return array.sort((a, b) => Math.random() - 0.5);
    },
    rangeInt: function (min, max) {
        return Math.floor(min + Math.random() * (max - min));
    },
    boolean: function () {
        return Math.random() < 0.5;
    },
    charFrom: function (chars) {
        return chars.charAt(this.rangeInt(0, chars.length));
    },
    chance: function (chance) {
        return Math.random() < chance;
    }
};

const handleAnimationDuration = 150;
const buttonAnimationDuration = 200;
const buttonAnimationOffset = 3;
class Typewriter {
    constructor(selector) {
        this.buttonAnimation = null;
        let root = errorChecked.query(selector);
        this.clickArea = errorChecked.query(".typewriter-clickarea");
        this.handleTop = errorChecked.query(".tw-handle-top");
        this.handleCenter = errorChecked.query(".tw-handle-center");
        this.buttons = [...document.querySelectorAll(".tw-button")];
        this.initialButtonPos = transform.getSvgPosition(this.buttons[0]);
    }
    set onClick(action) {
        this.clickArea.addEventListener("click", action);
    }
    animateButtons() {
        if (!this.buttonAnimation || this.buttonAnimation.completed) {
            const x = this.initialButtonPos.x;
            const y = this.initialButtonPos.y + buttonAnimationOffset;
            const targets = random.sort(random.filter(this.buttons, true));
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
        this.container = errorChecked.query(selector);
        this.initialTranslation = transform.getCssPosition(this.container).y;
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

const vowels = "аеёиоуыэюя";
const consonants = "бвгджзклмнпрстфхцчшщ";
function generateWord(minSyllables, maxSyllables) {
    const syllablesCount = maxSyllables ? random.rangeInt(minSyllables, maxSyllables + 1) : minSyllables;
    let word = "";
    let totalSyllables = 0;
    let startWithVowel = random.boolean();
    const addVowel = () => word += random.charFrom(vowels);
    const addConsonant = () => word += random.charFrom(consonants);
    while (totalSyllables < syllablesCount) {
        if (startWithVowel) {
            addVowel();
            totalSyllables++;
        }
        else {
            addConsonant();
            if (random.chance(0.2))
                addConsonant();
        }
        startWithVowel = !startWithVowel;
    }
    if (!startWithVowel && random.chance(0.4)) {
        addConsonant();
    }
    return word;
}

const syllables = { min: 2, max: 4 };
const paper = new Paper("#paper");
const typewriter = new Typewriter("#typewriter");
const sound = new Audio("type.wav");
typewriter.onClick = () => {
    sound.currentTime = 0;
    sound.play();
    typewriter.animateButtons();
    typewriter.animateHandle();
    let word = generateWord(syllables.min, syllables.max);
    paper.pushWord(word);
};
