#include <stdio.h>

int GCD(int a, int b);

int main()
{
    int a;
    int b;
    scanf("%d %d", &a, &b);

    int gcd = GCD(a, b);
    printf("GCD(%d,%d)=%d\n", a, b, gcd);

    return 0;
}

int GCD(int a, int b) {
    // calculates the GCD of 2 numbers using Euclid's algorithm

    int divisor = a / b;
    int remainder = a % b;

    // steps
    printf("%d=%d*%d+%d\n", a, b, divisor, remainder);
    
    if (remainder == 0)
    {
        return b;
    }
    else
    {
        a = b;
        b = remainder;
        return GCD(a, b);
    }
}