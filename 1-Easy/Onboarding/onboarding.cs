using System;

class Player
{
    static void Main(string[] args)
    {
        // game loop
        while (true)
        {
            string enemy1 = Console.ReadLine();
            int dist1 = int.Parse(Console.ReadLine());
            string enemy2 = Console.ReadLine();
            int dist2 = int.Parse(Console.ReadLine());

            Console.WriteLine((dist1 < dist2) ? enemy1 : enemy2);
        }
    }
}