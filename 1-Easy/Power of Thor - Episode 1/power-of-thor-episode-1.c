#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    int light_x;
    int light_y;
    int initial_tx;
    int initial_ty;
    scanf("%d%d%d%d", &light_x, &light_y, &initial_tx, &initial_ty);
    int x = initial_tx - light_x; // x starting position minus x light position
    int y = initial_ty - light_y; // y starting position minus y light position

    // game loop
    while (1) {
        // The remaining amount of turns Thor can move. Do not remove this line.
        int remaining_turns;
        scanf("%d", &remaining_turns);
        char direction[3];

        // Reset direction on each iteration
        direction[0] = '\0';

        if (y > 0) {
            strcat(direction, "N");
            y--;
        }
        else if (y < 0) {
            strcat(direction, "S");
            y++;
        }

        if (x > 0) {
            strcat(direction, "W");
            x--;
        }
        else if (x < 0) {
            strcat(direction, "E");
            x++;
        }

        printf("%s\n", direction);
    }
    
    return 0;
}