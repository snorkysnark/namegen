import Typewriter from './typewriter';
import Paper from './paper';
import generateWord from './generator';
import {random} from './utils';

const syllables = {min: 2, max: 4};

const paper = new Paper("#paper");
const typewriter = new Typewriter("#typewriter");
const sound = new Audio("type.wav")

typewriter.onClick = () => {
    sound.currentTime = 0;
    sound.play();
    
    typewriter.animateButtons();
    typewriter.animateHandle();

    let word = generateWord(syllables.min, syllables.max);
    paper.pushWord(word);
}