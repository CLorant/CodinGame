const possibleLetters = new Set(readline().split(" "));
const possibleStates = new Set(readline().split(" "));
const numberOfTransitions = parseInt(readline());
const transitionMap = new Map();

for (let i = 0; i < numberOfTransitions; i++) {
    const t = readline().split(" ");
    const firstState = t[0];
    const character = t[1];
    const secondState = t[2];

    // check if firstState exists in transitionMap
    transitionMap.set(firstState, (transitionMap.get(firstState) || new Map()).set(character, secondState));
}

const startState = readline();
const endStates = new Set(readline().split(" "));

function isWordInLanguage(word) {
    let currentState = startState;

    for (let i = 0; i < word.length; i++) {
        // check if it's isn't a possible state OR
        // check if there isn't a valid transition for the current state and character
        if (!possibleStates.has(currentState) ||
            !transitionMap.get(currentState)?.has(word[i])
        ) {
            return false;
        }
        currentState = transitionMap.get(currentState).get(word[i]);
    }

    // check if the current state is among the possible end states
    return endStates.has(currentState);
}

function isPossibleWord(word) {
    return [...word].every(c => possibleLetters.has(c));
}

const numberOfWords = parseInt(readline());
for (let i = 0; i < numberOfWords; i++) {
    const word = readline();
    const result = isPossibleWord(word) ? isWordInLanguage(word) : false;
    console.log(result);
}
