import Typewriter from './typewriter';
import Paper from './paper';

const paper = new Paper("#paper");
const typewriter = new Typewriter("#typewriter");
typewriter.setOnClick(() => {
    paper.pushWord("click");
});