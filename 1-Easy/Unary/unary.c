#include <stdio.h>
#include <string.h>

int main() {
    char MESSAGE[101];
    scanf("%[^\n]", MESSAGE);

    char encoded[1000] = "";
    int prev = -1;
    for (int i = 0; i < strlen(MESSAGE); i++) {
        for (int j = 6; j >= 0; j--) {
            // Get the j-th bit of the current character.
            int bit = MESSAGE[i] >> j & 1;
            if (bit != prev) {
                if (prev != -1) {
                    strcat(encoded, " ");
                }
                strcat(encoded, bit == 1 ? "0 " : "00 ");
                prev = bit;
            }
            strcat(encoded, "0");
        }
    }
    printf("%s", encoded);

    return 0;
}