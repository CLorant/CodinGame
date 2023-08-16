const H = parseInt(readline().split(" ")[1]); // width is not needed

const tLabels = readline().split("  ");

// fill up an array with 0 to the number of top labels, incrementing the value with each step
const path = Array.from({ length: tLabels.length }, (_, index) => index);

for (let i = 1; i < H - 1; i++) {
    const line = readline().split("|");

    for(let j = 0; j < line.length; j++) {
        if(line[j] == "--") {
            for (let k = 0; k < path.length; k++) {
                // redirect to right or left
                if (path[k] == j - 1) {
                    path[k]++;
                }
                else if (path[k] == j) {
                    path[k]--;
                }
            }
        }
    }
}

const bLabels = readline().split("  ");

for(let i = 0; i < tLabels.length; i++) {
    console.log(tLabels[i] + bLabels[path[i]]);
}