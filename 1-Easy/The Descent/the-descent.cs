using System;

class Player
{
    static void Main(string[] args)
    {
        const int NUMBER_OF_MOUNTAINS = 8;
        
        // game loop
        while (true)
        {
            int maxHeight = 0;
            int maxIndex = 0;

            for (int i = 0; i < NUMBER_OF_MOUNTAINS; i++)
            {
                // maximum selection BUT the index matters
                int mountainHeight = int.Parse(Console.ReadLine());
                if(maxHeight < mountainHeight)
                {
                    maxHeight = mountainHeight;
                    maxIndex = i;
                }
            }
            Console.WriteLine(maxIndex);
        }
    }
}