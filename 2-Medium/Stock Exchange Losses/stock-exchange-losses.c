#include <stdio.h>

int calculateMaxLoss(int *values, int n);

int main()
{
    int n;
    scanf("%d", &n);

    int inputs[n];
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &inputs[i]);
    }

    int maxLoss = calculateMaxLoss(inputs, n);
    printf("%d\n", maxLoss);

    return 0;
}

int calculateMaxLoss(int *values, int n)
{
    int maxLoss = 0;
    int currentMax = values[0];

    for (int i = 1; i < n; i++)
    {
        if (values[i] > currentMax)
        {
            currentMax = values[i];
        }
        else
        {
            int loss = currentMax - values[i];
            if (loss > maxLoss)
            {
                maxLoss = loss;
            }
        }
    }

    return -maxLoss;
}