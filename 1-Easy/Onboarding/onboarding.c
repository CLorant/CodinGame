#include <stdio.h>

int main() {
    char enemy1[257], enemy2[257];
    int dist1, dist2;

    // game loop
    while (1) {
        scanf("%s%d%s%d", enemy1, &dist1, enemy2, &dist2);
        printf("%s\n", (dist1 < dist2) ? enemy1 : enemy2);
    }

    return 0;
}