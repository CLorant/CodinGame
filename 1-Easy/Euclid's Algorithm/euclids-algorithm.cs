using System;

class Solution
{
    static void Main(string[] args)
    {
        string[] inputs = Console.ReadLine().Split(' ');
        int a = int.Parse(inputs[0]);
        int b = int.Parse(inputs[1]);

        int gcd = GCD(a, b);
        Console.WriteLine($"GCD({a},{b})={gcd}");
    }

    static int GCD(int a, int b)
    {
        // calculates the GCD of 2 numbers using Euclid's algorithm

        int divisor = a / b;
        int remainder = a % b;

        // steps
        Console.WriteLine($"{a}={b}*{divisor}+{remainder}");

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
}