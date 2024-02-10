// Populates the horseStrengths array
function fillHorseStrengths(horseStrengths: number[], horseCount: number): void {
    for (let i = 0; i < horseCount; i++) {
        horseStrengths.push(parseInt(readline()));
    }
}

// Iterates over the horseStrengths array, substracting the next element from the current one and returns the closest difference
function getClosestDifference(horseStrengths: number[], horseCount: number): number {
    let min = Number.MAX_VALUE;

    for (let i = 0; i < horseCount - 1; i++) {
        min = Math.min(min, horseStrengths[i + 1] - horseStrengths[i]);
    }

    return min;
}

const horseCount = parseInt(readline());
const horseStrengths: number[] = [];
fillHorseStrengths(horseStrengths, horseCount);
horseStrengths.sort((a, b) => a - b); // Sorts the horseStrengths array in ascending order

const min = getClosestDifference(horseStrengths, horseCount);
console.log(min);