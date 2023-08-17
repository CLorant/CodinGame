const width = parseInt(readline());
const height = parseInt(readline());
const grid = Array.from({ length: height }, () => Array(width).fill());

for (let i = 0; i < height; i++) {
    const line = readline();
    for (let j = 0; j < width; j++) {
        grid[i][j] = line[j];
    }
}

for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
        // only if NOT empty
        if (grid[i][j] !== '.') {
            let right = j + 1;
            let rightNeighbour = "-1 -1";

            // check until there is an empty cell to the right, stop before right equals the width
            while (right < width && grid[i][right] === '.') {
                right++;
            }

            // assign the value to rightNeighbour if there is a neighbour
            if (right < width) {
                rightNeighbour = `${right} ${i}`;
            }

            let down = i + 1;
            let downNeighbour = "-1 -1";

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
