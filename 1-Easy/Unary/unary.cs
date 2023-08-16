using System;

class Solution
{
    static void Main(string[] args)
    {
        string message = Console.ReadLine();
        string encoded = "";
        int prev = -1;
        for (int i = 0; i < message.Length; i++)
        {
            for (int j = 6; j >= 0; j--)
            {
                int bit = (int)Convert.ToChar(message[i]) >> j & 1;
                if (bit != prev)
                {
                    if (-1 != prev)
                    {
                        encoded += " ";
                    }
                    encoded += 1 == bit ? "0 " : "00 ";
                    prev = bit;
                }
                encoded += "0";
            }
        }
        Console.WriteLine(encoded);
    }
}