const REDIRECTION_SYMBOL = "--";
const PATH_SYMBOL = "|";
const PATH_SEPARATOR_SYMBOL = "  ";

// Fills an array with 0 to length
function createInitialPath(size: number): number[] {
    return Array.from({ length: size }, (_, index) => index);
}

// Processes a path input, updating the path array if redirections are found
function processPath(input: string, path: number[]): void {
    const line = input.split(PATH_SYMBOL);

    for (let i = 0; i < line.length; i++) {
        if (line[i] == REDIRECTION_SYMBOL) {
            redirectPath(i, path);
        }
    }
}

// Updates the path array based on the redirection index
function redirectPath(redirectIndex: number, path: number[]): void {
    for (let i = 0; i < path.length; i++) {
        // redirect to left or right
        if (path[i] == redirectIndex) {
            path[i]--;
        }
        else if (path[i] == redirectIndex - 1) {
            path[i]++;
        }
    }
}

// Prints the top labels in order, and the bottom label's elements by the order specified in the path array
function printResult(topLabels: string[], bottomLabels: string[], path: number[]): void {
    for (let i = 0; i < topLabels.length; i++) {
        console.log(`${topLabels[i]}${bottomLabels[path[i]]}`);
    }
}

const height = parseInt(readline().split(" ")[1]); // width is not needed
const topLabels = readline().split(PATH_SEPARATOR_SYMBOL);
const path = createInitialPath(topLabels.length);

// Starts indexing from 1 to height - 1 to only read the paths
for (let i = 1; i < height - 1; i++) {
    processPath(readline(), path);
}

const bottomLabels = readline().split("  ");
printResult(topLabels, bottomLabels, path);