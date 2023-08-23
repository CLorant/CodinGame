type gateFunction = {
  [key: string]: (a: boolean, b: boolean) => boolean
}

const gates: gateFunction = {
  "AND": (a: boolean, b: boolean): boolean => {
      return a && b;
  },
  "OR": (a: boolean, b: boolean): boolean => {
      return a || b;
  },
  "XOR": (a: boolean, b: boolean): boolean => {
      return (!a && b) || (a && !b);
  },
  "NAND": (a: boolean, b: boolean): boolean => {
      return !gates["AND"](a, b);
  },
  "NOR": (a: boolean, b: boolean): boolean => {
      return !gates["OR"](a, b);
  },
  // it's called XNOR but it was mistyped in the task, so it has to be called this
  "NXOR": (a: boolean, b: boolean): boolean => {
      return !gates["XOR"](a, b);
  },
};

type NamedSignal = {
  [key: string]: number;
}

const inputs: NamedSignal[] = [];

function processSignal(type: string, input1: string, input2: string): string {
  let signal: string = "";

  for (let i = 0; i < inputs[input1].length; i++) {
      const isInput1True: boolean = inputs[input1][i] === "-";
      const isInput2True: boolean = inputs[input2][i] === "-";
      const isTrue: boolean = gates[type](isInput1True, isInput2True);

      signal += isTrue ? "-" : "_";
  }

  return signal;
}

const n: number = parseInt(readline());
const m: number = parseInt(readline());

for (let i = 0; i < n; i++) {
  const line: string[] = readline().split(' ');
  inputs[line[0]] = line[1];
}

for (let i = 0; i < m; i++) {
  const line: string[] = readline().split(' ');

  // output name, type, input1, input2
  console.log(line[0] + " " + processSignal(line[1], line[2], line[3]));
}