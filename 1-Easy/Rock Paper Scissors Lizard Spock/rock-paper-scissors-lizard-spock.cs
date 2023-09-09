using System;
using System.Linq;
using System.Collections.Generic;

class Player
{
    public int number;
    public char sign;
    public List<int> opponents;

    public Player(string line)
    {
        string[] inputs = line.Split(' ');
        this.number = Convert.ToInt32(inputs[0]);
        this.sign = Convert.ToChar(inputs[1]);
        this.opponents = new List<int>();
    }
}

class Game
{
    /*
    Rock (R)
    Paper (P)
    sCissors (C)
    Lizard (L)
    Spock (S)

    Scissors: Paper, Lizard
    Paper: Rock, Spock
    Rock: Lizard, Scissors
    Lizard: Spock, Paper
    Spock: Scissors, Rock
    */

    
    // key: sign that wins
    // value: array of signs that lose
    static Dictionary<char, char[]> combinations = new Dictionary<char, char[]>
    {
        ['C'] = new[] { 'P', 'L' },
        ['P'] = new[] { 'R', 'S' },
        ['R'] = new[] { 'L', 'C' },
        ['L'] = new[] { 'S', 'P' },
        ['S'] = new[] { 'C', 'R' }
    };

    public static Player playGame(Player player1, Player player2)
    {
        // add player1 to the opponents of player2 and vice versa
        player1.opponents.Add(player2.number);
        player2.opponents.Add(player1.number);

        // if the signs are the same, return the player with the smaller number
        if (player1.sign == player2.sign)
        {
            return player1.number < player2.number ? player1 : player2;
        }

        // check if player1 wins
        if (combinations[player1.sign].Contains(player2.sign))
        {
            return player1;
        }

        // return player2 because player1 lost 
        return player2;
    }

    public static Player findWinner(List<Player> bracket)
    {
        // return the overall winner
        if (bracket.Count == 1) {
            return bracket[0];
        }

        List<Player> nextBracket = new List<Player>();
        for (int i = 0; i < bracket.Count; i += 2)
        {
            // pick the winner and add them to the next bracket
            Player winner = playGame(bracket[i], bracket[i + 1]);
            nextBracket.Add(winner);
        }

        // repeat until bracket contains only 1 player
        return findWinner(nextBracket);
    }
}

class Solution
{
    static void Main(string[] args)
    {
        int N = int.Parse(Console.ReadLine());
        List<Player> players = new List<Player>();

        for (int i = 0; i < N; i++)
        {
            players.Add(new Player(Console.ReadLine()));
        }

        Player winner = Game.findWinner(players);
        Console.WriteLine(winner.number);
        Console.WriteLine(string.Join(" ", winner.opponents));
    }
}