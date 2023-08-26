using System;
using System.Linq;
using System.Collections.Generic;

class Solution
{
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        int closest = 0;

        if (n != 0)
        {
            IEnumerable<int> inputs = Console.ReadLine().Split(' ').Select(int.Parse);

            // sorts in ascending order by the absolute values of the numbers first
            // then sorts by descending order so this way positives come before negatives
            closest = inputs.OrderBy(Math.Abs)
                            .ThenByDescending(x => x)
                            .FirstOrDefault();
        }
        Console.WriteLine(closest);
    }
}