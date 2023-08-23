const gates = {
    "AND": (a, b) => {
        return a && b; 
    },
    "OR": (a, b) => {
        return a || b;
    },
    "XOR": (a, b) => {
        return (!a && b) || (a && !b);
    },
    "NAND": (a, b) => {
        return !gates["AND"](a, b);
    },
    "NOR": (a, b) => {
        return !gates["OR"](a, b);
    },
    // it's called XNOR but it was mistyped in the task, so it has to be called this
    "NXOR": (a, b) => {
        return !gates["XOR"](a, b);
    },
};

const inputs = [];

function processSignal(type, input1, input2) {
    let signal = "";

    for(let i = 0; i < inputs[input1].length; i++) {
        const isInput1True = inputs[input1][i] === "-";
        const isInput2True = inputs[input2][i] === "-";
        const isTrue = gates[type](isInput1True, isInput2True);

        isTrue ? signal += "-" : signal += "_";
    }
    
    return signal;
}

const n = parseInt(readline());
const m = parseInt(readline());

for (let i = 0; i < n; i++) {
    const line = readline().split(' ');
    inputs[line[0]] = line[1];
}

for (let i = 0; i < m; i++) {
    const line = readline().split(' ');

    // output name, type, input1, input2
    console.log(line[0] + " " + processSignal(line[1], line[2], line[3]));
}