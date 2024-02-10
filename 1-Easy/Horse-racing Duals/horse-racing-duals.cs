using System;

class Solution
{
    static void Main(string[] args)
    {
        int horseCount = int.Parse(Console.ReadLine());
        int[] horseStrengths = new int[horseCount];
        FillHorseStrengths(ref horseStrengths, horseCount);
        SortHorseStrengths(ref horseStrengths);

        int min = GetClosestDifference(ref horseStrengths, horseCount);
        Console.WriteLine(min);
    }

    // Populates the horseStrengths array, uses ref to avoid having to copy another array
    static void FillHorseStrengths(ref int[] horseStrengths, int horseCount)
    {
        for (int i = 0; i < horseCount; i++)
        {
            horseStrengths[i] = int.Parse(Console.ReadLine());
        }
    }

    // Sorts the horseStrengths array in ascending order
    static void SortHorseStrengths(ref int[] horseStrengths)
    {
        Array.Sort(horseStrengths, (x, y) => x.CompareTo(y));
    }

    // Iterates over the horseStrengths array, substracting the next element from the current one and returns the closest difference
    static int GetClosestDifference(ref int[] horseStrengths, int horseCount)
    {
        int min = int.MaxValue;

        for (int i = 0; i < horseCount - 1; i++)
        {
            min = Math.Min(min, horseStrengths[i + 1] - horseStrengths[i]);
        }

        return min;
    }
}