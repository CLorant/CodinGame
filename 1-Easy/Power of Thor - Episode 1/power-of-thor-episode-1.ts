const inputs: number[] = readline().split(" ").map(Number);
let x: number = inputs[2] - inputs[0]; // x starting position minus x light position
let y:number = inputs[3] - inputs[1];  // y starting position minus y light position

// game loop
while (true) {
    const remainingTurns: number = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
    let direction: string = "";

    if (y > 0) {
        direction += "N";
        y--;
    }
    else if (y < 0) {
        direction += "S";
        y++;
    }
    if (x > 0) {
        direction += "W";
        x--;
    }
    else if (x < 0) {
        direction += "E";
        x++;
    }
    console.log(direction);
}