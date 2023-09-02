using System;
using System.Collections.Generic;
using System.Linq;

class Player
{
    static void Main()
    {
        int[] inputs = Console.ReadLine().Split(" ").Select(int.Parse).ToArray();
        int x = inputs[2] - inputs[0]; // x starting position minus x light position
        int y = inputs[3] - inputs[1];  // y starting position minus y light position

        // game loop
        while (true) {
            int remainingTurns = int.Parse(Console.ReadLine()); // The remaining amount of turns Thor can move. Do not remove this line.
            string direction = "";

            if (y > 0) {
                direction += "N";
                y--;
            }
            else if (y < 0) {
                direction += "S";
                y++;
            }
            if (x > 0) {
                direction += "W";
                x--;
            }
            else if (x < 0) {
                direction += "E";
                x++;
            }
            Console.WriteLine(direction);
        }
    }
}