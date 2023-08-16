using System;
using System.Linq;

class Solution
{
    static void Main(string[] args)
    {
        int height = int.Parse(Console.ReadLine().Split(' ')[1]);
        string[] tLabels = Console.ReadLine().Split("  ");
        int[] path = Enumerable.Range(0, tLabels.Length + 1).ToArray();
        
        for (int i = 1; i < height - 1; i++)
        {
            string[] line = Console.ReadLine().Split('|');

            for(int j = 0; j < line.Length; j++)
            {
                if(line[j] == "--")
                {
                    for (int k = 0; k < path.Length; k++)
                    {
                        if (path[k] == j - 1) {
                            path[k]++;
                        }
                        else if (path[k] == j) {
                            path[k]--;
                        }
                    }
                }
            }
        }
        string[] bLabels = Console.ReadLine().Split("  ");
        for(int i = 0; i < tLabels.Length; i++) 
        {
            Console.WriteLine($"{tLabels[i]}{bLabels[path[i]]}");
        }
    }
}