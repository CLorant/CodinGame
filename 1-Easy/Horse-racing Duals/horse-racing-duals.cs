using System;

class Solution
{
    static void Main(string[] args)
    {
        int N = int.Parse(Console.ReadLine());
        int[] strengths = new int[N];

        for (int i = 0; i < N; i++)
        {
            strengths[i] = int.Parse(Console.ReadLine());
        }

        // sorts the array in ascending order
        Array.Sort(strengths, (x, y) => x.CompareTo(y));

        int minimum = int.MaxValue;
        for (int i = 0; i < N - 1; i++)
        {
            // subtracts the value at the current index from the next index, assigns that value or not to minimum
            minimum = Math.Min(minimum, strengths[i + 1] - strengths[i]);
        }
        Console.WriteLine(minimum);
    }
}