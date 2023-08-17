const width: number = parseInt(readline());
const height: number = parseInt(readline());
const grid: string[][] = Array.from({ length: height }, () => Array(width).fill(null));

for (let i = 0; i < height; i++) {
    const line: string = readline();
    for (let j = 0; j < width; j++) {
        grid[i][j] = line[j];
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        // only if NOT empty
        if (grid[i][j] !== '.') {
            let right: number = j + 1;
            let rightNeighbour: string = "-1 -1";

            // check until there is an empty cell to the right, stop before right equals the width
            while (right < width && grid[i][right] === '.') {
                right++;
            }

            // assign the value to rightNeighbour if there is a neighbour
            if (right < width) {
                rightNeighbour = `${right} ${i}`;
            }

            let down: number = i + 1;
            let downNeighbour: string = "-1 -1";

            // check until there is an empty cell to the bottom, stop before down equals the width
            while (down < height && grid[down][j] === '.') {
                down++;
            }

            // assign the value to downNeighbour if there is a neighbour
            if (down < height) {
                downNeighbour = `${j} ${down}`;
            }

            console.log(`${j} ${i} ${rightNeighbour} ${downNeighbour}`);
        }
    }
}
