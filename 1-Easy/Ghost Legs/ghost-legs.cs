using System;
using System.Linq;

class Solution
{
    const string REDIRECTION_SYMBOL = "--";
    const string PATH_SYMBOL = "|";
    const string PATH_SEPARATOR_SYMBOL = "  ";

    static void Main(string[] args)
    {
        int height = int.Parse(Console.ReadLine().Split(' ')[1]); // width is not needed
        string[] topLabels = Console.ReadLine().Split(PATH_SEPARATOR_SYMBOL);
        int[] path = CreateInitialPath(topLabels.Length);

        // Starts indexing from 1 to height - 1 to only read the paths
        for (int i = 1; i < height - 1; i++)
        {
            ProcessPath(Console.ReadLine(), ref path);
        }

        string[] bottomLabels = Console.ReadLine().Split(PATH_SEPARATOR_SYMBOL);
        PrintResult(topLabels, bottomLabels, path);
    }

    // Fills an enumerable with 0 to length, then returns it as an array
    static int[] CreateInitialPath(int length)
    {
        return Enumerable.Range(0, length).ToArray();
    }

    // Processes a path input, updating the path array if redirections are found
    static void ProcessPath(string input, ref int[] path)
    {
        string[] line = input.Split(PATH_SYMBOL);

        for (int i = 0; i < line.Length; i++)
        {
            if (line[i] == REDIRECTION_SYMBOL)
            {
                RedirectPath(i, ref path);
            }
        }
    }

    // Updates the path array based on the redirection index
    static void RedirectPath(int redirectIndex, ref int[] path)
    {
        for (int i = 0; i < path.Length; i++)
        {
            // redirect to left or right
            if (path[i] == redirectIndex)
            {
                path[i]--;
            }
            else if (path[i] == redirectIndex - 1)
            {
                path[i]++;
            }
        }
    }

    // Prints the top labels in order, and the bottom label's elements by the order specified in the path array
    static void PrintResult(string[] topLabels, string[] bottomLabels, int[] path)
    {
        for (int i = 0; i < topLabels.Length; i++)
        {
            Console.WriteLine($"{topLabels[i]}{bottomLabels[path[i]]}");
        }
    }
}