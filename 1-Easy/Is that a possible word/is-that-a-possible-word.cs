using System;
using System.Collections.Generic;
using System.Linq;

class Solution
{
    static void Main(string[] args)
    {
       try
        {
            List<char> possibleLetters = ReadCharList();
            List<string> possibleStates = ReadStringList();
            ushort numberOfTransitions = ReadUShort();
            Dictionary<string, Dictionary<char, string>> transitionMap =
                InitializeTransitionMap(numberOfTransitions, possibleStates);

            string startState = Console.ReadLine();
            List<string> endStates = ReadStringList();
            ushort numberOfWords = ReadUShort();

            PrintResults(possibleLetters, transitionMap, endStates, startState, numberOfWords);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    static List<char> ReadCharList()
    {
        return Console.ReadLine()
                      .Split(' ')
                      .Select(Convert.ToChar)
                      .ToList();
    }

    static List<string> ReadStringList()
    {
        return Console.ReadLine()
                      .Split(' ')
                      .ToList();
    }

    static ushort ReadUShort()
    {
        return Convert.ToUInt16(Console.ReadLine());
    }

    // Splits the line into first state, transition char and second state, checks if the states are valid, then returns them as a tuple
    static (string, char, string) SplitTransition(List<string> possibleStates)
    {
        string[] transitions = Console.ReadLine().Split(' ');
        string firstState = transitions[0];
        char transitionChar = Convert.ToChar(transitions[1]);
        string secondState = transitions[2];
        
        if (!possibleStates.Contains(firstState) || !possibleStates.Contains(secondState))
        {
            throw new ArgumentException($"Invalid state: {firstState} or {secondState}");
        }

        return (firstState, transitionChar, secondState);
    }

    // Initializes a transition map using the given number of transitions
    static Dictionary<string, Dictionary<char, string>> InitializeTransitionMap(ushort numberOfTransitions, List<string> possibleStates)
    {
        var transitionMap = new Dictionary<string, Dictionary<char, string>>();

        for (ushort i = 0; i < numberOfTransitions; i++)
        {
            var (firstState, transitionCharacter, secondState) = SplitTransition(possibleStates);
            
            if (!transitionMap.ContainsKey(firstState))
            {
                transitionMap[firstState] = new Dictionary<char, string>();
            }

            transitionMap[firstState][transitionCharacter] = secondState;
        }

        return transitionMap;
    }

    // Checks if a word is in the language defined by the transition map and end states
    static bool IsWordInLanguage(string word, string startState, Dictionary<string, Dictionary<char, string>> transitionMap, List<string> endStates)
    {
        string currentState = startState;

        foreach (char character in word)
        {
            if (!transitionMap.TryGetValue(currentState, out var stateTransitions) ||
                !stateTransitions.ContainsKey(character))
            {
                return false;
            }
            currentState = stateTransitions[character];
        }

        return endStates.Contains(currentState);
    }

    // Checks if a word is composed of only possible letters
    static bool IsPossibleWord(string word, List<char> possibleLetters)
    {
        return word.All(c => possibleLetters.Contains(c));
    }

    static void PrintResults(List<char> possibleLetters, Dictionary<string, Dictionary<char, string>> transitionMap, List<string> endStates, string startState, ushort numberOfWords)
    {
        for (int i = 0; i < numberOfWords; i++)
        {
            string word = Console.ReadLine();
            bool result = IsPossibleWord(word, possibleLetters) &&
                          IsWordInLanguage(word, startState, transitionMap, endStates);

            // Neccessary due to C# booleans being "True" or "False"
            // And the task expects the outputs "true" or "false"
            Console.WriteLine(result.ToString().ToLower());
        }
    }
}