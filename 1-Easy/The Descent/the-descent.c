#include <stdlib.h>
#include <stdio.h>
#define NUMBER_OF_MOUNTAINS 8

int main()
{
    // game loop
    while (1) {
        int maxHeight = 0;
        int maxIndex = 0;

        for (int i = 0; i < NUMBER_OF_MOUNTAINS; i++) {
            // maximum selection BUT the index matters
            int mountainHeight;
            scanf("%d", &mountainHeight);

            if(maxHeight < mountainHeight) {
                maxHeight = mountainHeight;
                maxIndex = i;
            }
        }

        printf("%d\n", maxIndex);
    }

    return 0;
}