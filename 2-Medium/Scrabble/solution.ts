class Letter {
    [letter: string]: number
}

const letterScores: Letter = {
    'e': 1, 'a': 1, 'i': 1, 'o': 1, 'n': 1, 'r': 1, 't': 1, 'l': 1, 's': 1, 'u': 1,
    'd': 2, 'g': 2,
    'b': 3, 'c': 3, 'm': 3, 'p': 3,
    'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
    'k': 5,
    'j': 8, 'x': 8,
    'q': 10, 'z': 10,
};

function calculateWordScore(word: string) {
    let score = 0;
    for (const char of word) {
        score += letterScores[char];
    }
    return score;
}

class Word {
    text: string;
    score: number;

    constructor(text: string) {
        this.text = text;
        this.score = calculateWordScore(text);
    }
}

const n: number = parseInt(readline());
const words: Word[] = [];

for (let i = 0; i < n; i++) {
    words.push(new Word(readline()));
}

const letters: string = readline();
const remainingLetters: Letter = {};

for (const char of letters) {
    if (remainingLetters[char]) {
        remainingLetters[char]++;
    }
    else {
        remainingLetters[char] = 1;
    }
}

const possibleWords: Word[] = [];

for (let i = 0; i < words.length; i++) {
    const word: string = words[i].text;
    const tempLetters: Letter = { ...remainingLetters };
    let isPlayable: boolean = true;

    for (const char of word) {
        if (tempLetters[char]) {
            tempLetters[char]--;
        }
        else {
            isPlayable = false;
            break;
        }
    }

    if (isPlayable) {
        possibleWords.push(words[i]);
    }
}

const highestValueWord: Word = possibleWords.reduce((highest, current) => {
    return current.score > highest.score ? current : highest;
}, possibleWords[0]);

console.log(highestValueWord.text);