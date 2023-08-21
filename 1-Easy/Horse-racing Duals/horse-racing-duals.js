const N = parseInt(readline());
const strengths = [];

for (let i = 0; i < N; i++) {
    strengths.push(parseInt(readline()));
}

// sorts the array in ascending order
strengths.sort((a, b) => a - b);

let minimum = Number.MAX_VALUE;
for (let i = 0; i < N - 1; i++) {
    // subtracts the value at the current index from the next index, assigns that value or not to minimum
    minimum = Math.min(minimum, strengths[i + 1] - strengths[i]);
}

console.log(minimum);