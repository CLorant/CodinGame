#include <stdio.h>

int getGCD(int firstNumber, int secondNumber);

int main()
{
    int firstNumber;
    int secondNumber;
    scanf("%d %d", &firstNumber, &secondNumber);

    int gcd = getGCD(firstNumber, secondNumber);
    
    printf("GCD(%d,%d)=%d\n", firstNumber, secondNumber, gcd);

    return 0;
}

// Recursively calculates the GCD of 2 numbers using Euclid's algorithm, printing each step to the console
int getGCD(int firstNumber, int secondNumber)
{
    int divisor = firstNumber / secondNumber;
    int remainder = firstNumber % secondNumber;

    printf("%d=%d*%d+%d\n", firstNumber, secondNumber, divisor, remainder);
    
    if (remainder != 0)
    {
        firstNumber = secondNumber;
        secondNumber = remainder;

        return getGCD(firstNumber, secondNumber);
    }

    return secondNumber;
}