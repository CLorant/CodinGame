#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int comparer(const void *elem1, const void *elem2) {
    int value1 = *((int*)elem1);
    int value2 = *((int*)elem2);

    // Prioritize positive values over negative values
    if (value1 >= 0 && value2 < 0) {
        return -1; // elem1 is positive, prioritize it
    }
    else if (value1 < 0 && value2 >= 0) {
        return 1;  // elem2 is positive, prioritize it
    }

    // Both are positive or both are negative, compare their absolute values
    return abs(value1) - abs(value2);
}

int main() {
  int n;
  scanf("%d", &n);
  int closest = 0;

  if (n != 0) {
    int temperatures[n];

    for (int i = 0; i < n; i++) {
      int t;
      scanf("%d", &t);
      temperatures[i] = t;
    }

    qsort(temperatures, sizeof(temperatures) / sizeof(*temperatures), sizeof(*temperatures), comparer);

    closest = temperatures[0];
  }

  printf("%d", closest);

  return 0;
}