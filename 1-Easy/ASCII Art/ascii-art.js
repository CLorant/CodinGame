const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?'.split('');
const LENGTH = parseInt(readline());
const HEIGHT = parseInt(readline());
const TEXT = readline();
const letterIndexes = [];

// put the indexes of the letters into an array
for (const char of TEXT) {
    if (ALPHABET.includes(char.toUpperCase())) {
        // the index of character multiplied by LENGTH
        letterIndexes.push((ALPHABET.indexOf(char.toUpperCase()) + 1) * LENGTH);
    }
    else {
        // the index of the last element, ?, multiplied by LENGTH
        letterIndexes.push(ALPHABET.length * LENGTH);
    }
}

let asciiArt = "";
for (let i = 0; i < HEIGHT; i++) {
    const ROW = readline();
    for (const index of letterIndexes) {
      // slice ROW at the given start and end, then append that to the asciiArt string
      asciiArt += ROW.slice(index - LENGTH, index);
    }
    asciiArt += "\n";
}

console.log(asciiArt);