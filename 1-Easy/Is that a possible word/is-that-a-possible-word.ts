function createStringSet(line: string): Set<string> {
    return new Set<string>(line.split(" "));
}

// Create a transition map representing state transitions
function createTransitionMap(numberOfTransitions: number): Map<string, Map<string, string>> {
    const transitionMap = new Map<string, Map<string, string>>();

    for (let i = 0; i < numberOfTransitions; i++) {
        const transition = readline().split(" ");
        const firstState = transition[0];
        const character = transition[1];
        const secondState = transition[2];
        let stateMap: Map<string, string>;

        // If the first state already exists in the transition map, retrieve its state map, 
        // otherwise, create a new state map and add it to the transition map
        if (transitionMap.has(firstState)) {
            stateMap = transitionMap.get(firstState);
        }
        else {
            stateMap = new Map<string, string>();
            transitionMap.set(firstState, stateMap);
        }

        stateMap.set(character, secondState);
    }

    return transitionMap;
}

// Check if a given word is in the language represented by the finite automaton
function isWordInLanguage(word: string, possibleStates: Set<string>, transitionMap: Map<string, Map<string, string>>): boolean {
    let currentState: string = startState;

    for (let i = 0; i < word.length; i++) {
        const isPossibleState = possibleStates.has(currentState);
        const isValidTransition = transitionMap.get(currentState)?.has(word[i]);

        // If the current state is not among possible states or there's no valid transition for the current character, return false
        if (!isPossibleState || !isValidTransition) {
            return false;
        }

        currentState = transitionMap.get(currentState)?.get(word[i]);
    }

    // Check if the current state is among the possible end states
    return endStates.has(currentState);
}

// Check if a given word consists entirely of possible letters
function isPossibleWord(word: string, possibleLetters: Set<string>): boolean {
    return [...word].every(c => possibleLetters.has(c));
}

const possibleLetters = createStringSet(readline());
const possibleStates = createStringSet(readline());
const numberOfTransitions = parseInt(readline());
const transitionMap = createTransitionMap(numberOfTransitions);
const startState = readline();
const endStates = createStringSet(readline());
const numberOfWords = parseInt(readline());

for (let i = 0; i < numberOfWords; i++) {
    const word = readline();
    const result = isPossibleWord(word, possibleLetters) &&
                   isWordInLanguage(word, possibleStates, transitionMap);
    console.log(result);
}