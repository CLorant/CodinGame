// game loop
while (true) {
    const enemy1: string = readline();
    const dist1: number = parseInt(readline());
    const enemy2: string = readline();
    const dist2: number = parseInt(readline());

    console.log((dist1 < dist2) ? enemy1 : enemy2);
}