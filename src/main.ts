import Typewriter from './typewriter';
import Paper from './paper';

class App {
    typewriter: Typewriter;
    paper: Paper;

    constructor(typewriterSelector: string, paperSelector: string) {
        this.typewriter = new Typewriter(typewriterSelector, () => this.onTypewriterClick());
        this.paper = new Paper(paperSelector);
    }

    onTypewriterClick() {
        console.log("click");
        this.paper.pushWord("сосулька");
    }
}

new App("#typewriter", "#paper");