using System;

class Player
{
    static void Main(string[] args)
    {
        int width = int.Parse(Console.ReadLine());
        int height = int.Parse(Console.ReadLine());
        char[,] grid = new char[height, width];

        for (int i = 0; i < height; i++)
        {
            string line = Console.ReadLine();
            for(int j = 0; j < width; j++)
            {
                grid[i, j] = line[j];
            }
        }

        for(int i = 0; i < height; i++)
        {
            for(int j = 0; j < width; j++)
            {
                // only if NOT empty
                if(grid[i, j] != '.')
                {
                    int right = j + 1;
                    string rightNeighbour = "-1 -1";

                    // check until there is an empty cell to the right, stop before right equals the width
                    while (right < width && grid[i, right] == '.')
                    {
                        right++;
                    }

                    // assign the value to rightNeighbour if there is a neighbour
                    if (right < width)
                    {
                        rightNeighbour = $"{right} {i}";
                    }

                    int down = i + 1;
                    string downNeighbour = "-1 -1";

                    // check until there is an empty cell to the bottom, stop before down equals the width
                    while (down < height && grid[down, j] == '.')
                    {
                        down++;
                    }

                    // assign the value to downNeighbour if there is a neighbour
                    if(down < height)
                    {
                        downNeighbour = $"{j} {down}";
                    }

                    Console.WriteLine($"{j} {i} {rightNeighbour} {downNeighbour}");
                }
            }
        }
    }
}