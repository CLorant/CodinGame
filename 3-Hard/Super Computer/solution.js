const N = parseInt(readline());
const calculations = [];

// reads the inputs and adds them to the array
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const J = parseInt(inputs[0]);
    const D = parseInt(inputs[1]);
    calculations.push({ start: J, end: J + D - 1 });
}

// sorts the array in ascending order by the "end" property
calculations.sort((a, b) => a.end - b.end);

let lastEnd = 0;
let calculationCount = 0;

// checks if the end of the previous calculation is smaller than the start of the current calculation
for (let i = 0; i < N; i++) {
    if (lastEnd < calculations[i].start) {
        calculationCount++;
        lastEnd = calculations[i].end;
    }
}
console.log(calculationCount);