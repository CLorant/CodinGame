using System;
using System.Linq;
using System.Collections.Generic;

class Solution
{
    static void Main(string[] args)
    {
        List<char> possibleLetters = Console.ReadLine()
                                            .Split(' ')
                                            .Select(Convert.ToChar)
                                            .ToList();
        List<string> possibleStates = Console.ReadLine()
                                            .Split(' ')
                                            .ToList();
        int numberOfTransitions = int.Parse(Console.ReadLine());
        var transitionMap = new Dictionary<string, Dictionary<char, string>>();

        for (int i = 0; i < numberOfTransitions; i++)
        {
            string[] t = Console.ReadLine().Split(' ');
            string firstState = t[0];
            char character = char.Parse(t[1]);
            string secondState = t[2];
            
            // check if firstState exists in transitionMap
            if (!transitionMap.ContainsKey(firstState))
            {
                transitionMap[firstState] = new Dictionary<char, string>();
            }

            transitionMap[firstState][character] = secondState;
        }

        string startState = Console.ReadLine();
        List<string> endStates = new List<string>(Console.ReadLine().Split(' '));

        string IsWordInLanguage(string word)
        {
            string currentState = startState;

            foreach (char character in word)
            {
                // check if it's isn't a possible state OR
                // check if there isn't a valid transition for the current state and character
                if (!possibleStates.Contains(currentState) || 
                    !transitionMap.ContainsKey(currentState) || 
                    !transitionMap[currentState].ContainsKey(character))
                {
                    // the return has to be "false" instead of False due to the task
                    return "false";
                }
                currentState = transitionMap[currentState][character];
            }

            // check if the current state is among the possible end states
            // the return has to be "true" or "false" instead of True or False due to the task
            return endStates.Contains(currentState) ? "true" : "false";
        }

        bool IsPossibleWord(string word)
        {
            return word.All(c => possibleLetters.Contains(c));
        }

        int numberOfWords = int.Parse(Console.ReadLine());
        for (int i = 0; i < numberOfWords; i++)
        {
            string word = Console.ReadLine();
            string result = IsPossibleWord(word) ? IsWordInLanguage(word) : "false";
            Console.WriteLine(result);
        }
    }
}