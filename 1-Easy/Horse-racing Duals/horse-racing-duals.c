#include <stdlib.h>
#include <stdio.h>

// uses void parameters due to qsort's last parameter requiring it
int comparer(const void *elem1, const void *elem2) {
    // casts the pointers to void then to int
    return *((int*)elem1) - *((int*)elem2);
}

int main() {
    int N;
    scanf("%d", &N);
    int strength[N];

    for (int i = 0; i < N; i++) {
        int pi;
        scanf("%d", &pi);
        strength[i] = pi;
    }

    // sorts the array using quicksort in ascending order
    qsort(strength, sizeof(strength) / sizeof(*strength), sizeof(*strength), comparer);
    
    int minimum = __INT_MAX__;
    for (int i = 0; i < N - 1; i++) {
        int current = strength[i + 1] - strength[i];
        if (current < minimum) {
            minimum = current;
        }
    }
    printf("%d", minimum);

    return 0;
}