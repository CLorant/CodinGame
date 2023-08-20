const abbreviations: { [key: string]: string } = {
  sp: " ",
  bS: "\\",
  sQ: "'",
  nl: "\n"
};

const recipe: string[] = readline().split(' ');
let image: string = "";
let n: number = 0;

for (const chunk of recipe) {
  // takes the last 2 letter of chunk, if it's not in abbreviations, then it's undefined
  const abbreviationChar: string | undefined = abbreviations[chunk.slice(-2)];
  if (abbreviationChar === "\n") {
      // nl doesn't have any number before it, so this part is to skip the for loop
      image += abbreviationChar;
  }
  else if (abbreviationChar) {
      n = parseInt(chunk.slice(0, -2)); // all characters in the string except the last 2
      for (let i = 0; i < n; i++) {
          image += abbreviationChar;
      }
  }
  else {
      // not an abbreviation, since abbreviationChar is undefined
      n = parseInt(chunk.slice(0, -1)); // all characters in the string except the last one
      for (let i = 0; i < n; i++) {
          image += chunk.slice(-1);
      }
  }
}

console.log(image);