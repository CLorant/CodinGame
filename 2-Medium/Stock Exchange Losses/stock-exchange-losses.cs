using System;

class Solution
{
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        int[] values = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);

        int maxLoss = CalculateMaxLoss(values, n);
        Console.WriteLine(maxLoss);
    }

    static int CalculateMaxLoss(int[] values, int n)
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
                maxLoss = Math.Max(maxLoss, currentMax - values[i]);
            }
        }

        return -maxLoss;
    }
}
