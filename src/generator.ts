import {random} from './utils';

const vowels = "аеёиоуыэюя";
const consonants = "бвгджзклмнпрстфхцчшщ";

function generateWord(minSyllables: number, maxSyllables?: number): string {
    const syllablesCount = maxSyllables ? random.rangeInt(minSyllables, maxSyllables + 1) : minSyllables;
    let word = "";
    let totalSyllables = 0;
    let startWithVowel = random.boolean();
    
    const addVowel = () => word += random.charFrom(vowels);
    const addConsonant = () => word += random.charFrom(consonants);

    while(totalSyllables < syllablesCount) {
        if(startWithVowel) {
            addVowel();
            totalSyllables++;
        } else {
            addConsonant();
            if(random.chance(0.2)) addConsonant();
        }
        startWithVowel = !startWithVowel;
    }
    if(!startWithVowel && random.chance(0.4)) {
        addConsonant();
    }
    return word;
}

export default generateWord;