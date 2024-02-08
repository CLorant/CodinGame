using System;

class Solution
{
    static void Main(string[] args)
    {
        string[] inputs = Console.ReadLine().Split(' ');
        int firstNumber = int.Parse(inputs[0]);
        int secondNumber = int.Parse(inputs[1]);
        int gcd = getGCD(firstNumber, secondNumber);
        
        Console.WriteLine($"GCD({firstNumber},{secondNumber})={gcd}");
    }

    // Calculates the GCD of 2 numbers using Euclid's algorithm, printing each step to the console
    static int getGCD(int firstNumber, int secondNumber)
    {
        int divisor = firstNumber / secondNumber;
        int remainder = firstNumber % secondNumber;

        Console.WriteLine($"{firstNumber}={secondNumber}*{divisor}+{remainder}");

        if (remainder != 0)
        {
            firstNumber = secondNumber;
            secondNumber = remainder;

            return getGCD(firstNumber, secondNumber);
        }
        
        return secondNumber;
    }
}