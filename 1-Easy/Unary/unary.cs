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
                // Get the j-th bit of the current character.
                int bit = (int)Convert.ToChar(message[i]) >> j & 1;
                if (bit != prev)
                {
                    if (prev != -1)
                    {
                        encoded += " ";
                    }
                    encoded += bit == 1 ? "0 " : "00 ";
                    prev = bit;
                }
                encoded += "0";
            }
        }
        Console.WriteLine(encoded);
    }
}