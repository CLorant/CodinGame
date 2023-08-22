const NUMBER_OF_MOUNTAINS = 8;

// game loop
while (true) {
    let maxHeight = 0;
    let maxIndex = 0;
    for (let i = 0; i < NUMBER_OF_MOUNTAINS; i++) {
        // maximum selection BUT the index matters
        const mountainHeight = parseInt(readline());
        if(maxHeight < mountainHeight) {
            maxHeight = mountainHeight;
            maxIndex = i;
        }
    }

    console.log(maxIndex);
}