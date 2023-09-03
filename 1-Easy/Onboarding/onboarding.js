// game loop
while (true) {
    const enemy1 = readline();
    const dist1 = parseInt(readline());
    const enemy2 = readline();
    const dist2 = parseInt(readline());

    console.log((dist1 < dist2) ? enemy1 : enemy2);
}