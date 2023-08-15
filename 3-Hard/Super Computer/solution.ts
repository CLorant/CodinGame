class Calculation {
    start: number;
    end: number;

    constructor(start: number, duration: number) {
        this.start = start;
        this.end = start + duration - 1;
    }
}

const N: number = parseInt(readline());
const calculations: Calculation[] = [];

// reads the inputs and adds them to the array
for (let i = 0; i < N; i++) {
    let inputs: string[] = readline().split(' ');
    const J: number = parseInt(inputs[0]);
    const D: number = parseInt(inputs[1]);
    calculations.push(new Calculation(J, D));
}

// sorts the array in ascending order by the "end" property
calculations.sort((a, b) => a.end - b.end);

let lastEnd: number = 0;
let calculationCount: number = 0;

// checks if the end of the previous calculation is smaller than the start of the current calculation
for (let i = 0; i < N; i++) {
    if (lastEnd < calculations[i].start) {
        calculationCount++;
        lastEnd = calculations[i].end;
    }
}
console.log(calculationCount);