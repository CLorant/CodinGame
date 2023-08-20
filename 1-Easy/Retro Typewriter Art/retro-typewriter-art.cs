using System;
using System.Collections.Generic;

class Solution
{
    static void Main(string[] args)
    {
        Dictionary<string, char> abbreviations = new Dictionary<string, char>
        {
            { "sp", ' ' }, 
            { "bS", '\\' },
            { "sQ", '\'' },
            { "nl", '\n' }
        };

        string[] recipe = Console.ReadLine().Split(' ');
        string image = "";
        int n = 0;
        
        foreach (string chunk in recipe)
        {
            // check if abbreviations contains a key by last 2 characters of the string, if yes then return it or 0
            char abbreviationChar = abbreviations.GetValueOrDefault(chunk.Substring(chunk.Length - 2, 2));

            if (abbreviationChar == '\n')
            {
                // nl doesn't have any number before it, so this part is to skip the for loop
                image += abbreviationChar;
            }
            else if (abbreviationChar != 0)
            {
                // it's an abbreviation, since it's not the default char value
                n = Convert.ToInt32(chunk.Substring(0, chunk.Length - 2));  // all characters in the string except the last 2
                for (int i = 0; i < n; i++)
                {
                    image += abbreviationChar;
                }
            }
            else
            {
                n = Convert.ToInt32(chunk.Substring(0, chunk.Length - 1)); // all characters in the string except the last one
                for (int i = 0; i < n; i++)
                {
                    image += chunk[chunk.Length - 1];
                }
            }
        }

        Console.WriteLine(image);
    }
}