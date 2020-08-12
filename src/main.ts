import Typewriter from './typewriter';
import Paper from './paper';

const paper = new Paper("#paper");
const typewriter = new Typewriter("#typewriter");
const sound = new Audio("type.wav")

typewriter.onClick = () => {
    sound.currentTime = 0;
    sound.play();
    
    typewriter.animateButtons();
    typewriter.animateHandle();

    paper.pushWord("click");
}