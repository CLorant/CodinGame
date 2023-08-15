using System;
using System.Linq;
using System.Collections.Generic;

class Word
{
    private string text;
    private int score;

    public string Text
    {
        get { return text; }
        private set { text = value; }
    }

    public int Score
    {
        get { return score; }
        private set { score = value; }
    }

    static Dictionary<char, int> LetterScores = new Dictionary<char, int>
    {
        {'e', 1}, {'a', 1}, {'i', 1}, {'o', 1}, {'n', 1}, {'r', 1}, {'t', 1}, {'l', 1}, {'s', 1}, {'u', 1},
        {'d', 2}, {'g', 2},
        {'b', 3}, {'c', 3}, {'m', 3}, {'p', 3},
        {'f', 4}, {'h', 4}, {'v', 4}, {'w', 4}, {'y', 4},
        {'k', 5},
        {'j', 8}, {'x', 8},
        {'q', 10}, {'z', 10},
    };

    static int CalculateWordScore(string word)
    {
        int score = 0;
        foreach (char c in word)
        {
            score += LetterScores.ContainsKey(c) ? LetterScores[c] : 0;
        }
        return score;
    }

    public Word(string word)
    {
        this.Text = word;
        this.Score = CalculateWordScore(word);
    }
}

class Solution
{
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        Word[] words = new Word[n];

        for (int i = 0; i < n; i++)
        {
            words[i] = new Word(Console.ReadLine()); 
        }

        string letters = Console.ReadLine();
        Dictionary<char, int> remainingLetters = new Dictionary<char, int>();

        foreach (char c in letters) {
            if (remainingLetters.ContainsKey(c)) {
                remainingLetters[c]++;
            }
            else {
                remainingLetters[c] = 1;
            }
        }

        List<Word> possibleWords = new List<Word>();
        for (int i = 0; i < words.Length; i++)
        {
            string word = words[i].Text;
            Dictionary<char, int> currentRemainingLetters = new Dictionary<char, int>(remainingLetters);
            bool isPlayable = true;

            foreach (char c in word)
            {
                if (currentRemainingLetters.ContainsKey(c) && currentRemainingLetters[c] > 0)
                {
                    currentRemainingLetters[c]--;
                }
                else
                {
                    isPlayable = false;
                    break;
                }
            }

            if (isPlayable)
            {
                possibleWords.Add(words[i]);
            }
        }

        Word highestValueWord = possibleWords.Aggregate((highest, current) =>
            current.Score > highest.Score ? current : highest);

        Console.WriteLine(highestValueWord.Text);
    }
}