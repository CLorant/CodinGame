using System;
using System.Linq;

class Solution
{
    static void Main(string[] args)
    {
        char[] ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?".ToCharArray();
        int LENGTH = int.Parse(Console.ReadLine());
        int HEIGHT = int.Parse(Console.ReadLine());
        string TEXT = Console.ReadLine().ToUpper();
        int[] letterIndexes = new int[TEXT.Length];
        
        // put the indexes of the letters into an array
        for (int i = 0; i < TEXT.Length; i++)
        {
            if (ALPHABET.Contains(TEXT[i]))
            {
                // the index of character multiplied by LENGTH
                letterIndexes[i] = (Array.FindIndex(ALPHABET, c => c == TEXT[i]) + 1) * LENGTH;
            }
            else
            {
                // the index of the last element, ?, multiplied by LENGTH
                letterIndexes[i] = ALPHABET.Length * LENGTH;
            }
        }

        string asciiArt = "";
        for (int i = 0; i < HEIGHT; i++)
        {
            string ROW = Console.ReadLine();
            foreach (int index in letterIndexes)
            {
                // substring ROW at the given start and end, then append that to the asciiArt string
                asciiArt += ROW.Substring(index - LENGTH, LENGTH);
            }
            asciiArt += "\n";
        }

        Console.WriteLine(asciiArt);
    }
}