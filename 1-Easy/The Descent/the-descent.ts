const NUMBER_OF_MOUNTAINS: number = 8;

// game loop
while (true) {
    let maxHeight: number = 0;
    let maxIndex: number = 0;
    for (let i = 0; i < NUMBER_OF_MOUNTAINS; i++) {
        // maximum selection BUT the index matters
        const mountainHeight: number = parseInt(readline());
        if(maxHeight < mountainHeight) {
            maxHeight = mountainHeight;
            maxIndex = i;
        }
    }

    console.log(maxIndex);
}