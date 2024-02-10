#include <stdio.h>
#include <stdlib.h>

void fillHorseStrengths(int *horseStrengths, int horseCount);
int sortByAscending(const void *next, const void *current);
int getClosestDifference(int *horseStrengths, int horseCount);

int main()
{
    int horseCount;
    scanf("%d", &horseCount);
    int horseStrengths[horseCount];
    fillHorseStrengths(horseStrengths, horseCount);
    
    // Sorts the horseStrengths array in ascending order
    qsort(horseStrengths,
        sizeof(horseStrengths) / sizeof(*horseStrengths),
        sizeof(*horseStrengths),
        sortByAscending
    );
    
    int min = getClosestDifference(horseStrengths, horseCount);
    printf("%d", min);

    return 0;
}

// Populates the horseStrengths array
void fillHorseStrengths(int *horseStrengths, int horseCount)
{
    for (int i = 0; i < horseCount; i++)
    {
        scanf("%d", &horseStrengths[i]);
    }
}

// Comparator function for ascending order sorting
int sortByAscending(const void *x, const void *y)
{
    return *((int*)x) - *((int*)y);
}

// Iterates over the horseStrengths array, substracting the next element from the current one and returns the closest difference
int getClosestDifference(int *horseStrengths, int horseCount)
{
    int min = __INT_MAX__;

    for (int i = 0; i < horseCount - 1; i++)
    {
        int current = horseStrengths[i + 1] - horseStrengths[i];
        
        if (current < min)
        {
            min = current;
        }
    }

    return min;
}