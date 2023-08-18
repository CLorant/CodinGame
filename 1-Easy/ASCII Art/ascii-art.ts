const ALPHABET: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?'.split('');
const LENGTH: number = parseInt(readline());
const HEIGHT: number = parseInt(readline());
const TEXT: string = readline().toLocaleUpperCase();
const letterIndexes: number[] = [];

// put the indexes of the letters into an array
for (const char of TEXT) {
    if (ALPHABET.includes(char)) {
        // the index of character multiplied by LENGTH
        letterIndexes.push((ALPHABET.indexOf(char) + 1) * LENGTH);
    }
    else {
        // the index of the last element, ?, multiplied by LENGTH
        letterIndexes.push(ALPHABET.length * LENGTH);
    }
}

let asciiArt: string = "";
for (let i = 0; i < HEIGHT; i++) {
    const ROW: string = readline();
    for (const index of letterIndexes) {
        // slice ROW at the given start and end, then append that to the asciiArt string
        asciiArt += ROW.slice(index - LENGTH, index);
    }
    asciiArt += "\n";
}

console.log(asciiArt);