using System;
using System.Collections.Generic;

class Solution
{
    static Dictionary<string, Func<bool, bool, bool>> gates = new Dictionary<string, Func<bool, bool, bool>>
    {
        {
            "AND", (a, b) => { return a && b; }
        },
        {
            "OR", (a, b) => { return a || b; }
        },
        {
            "XOR", (a, b) => { return (!a && b) || (a && !b); }
        },
        {
            "NAND", (a, b) => { return !(a && b); }
        },
        {
            "NOR", (a, b) => { return !(a || b); }
        },
        {
            // it's called XNOR but it was mistyped in the task, so it has to be called this
            "NXOR", (a, b) => { return (a && b) || (!a && !b); }
        }
    };

    static Dictionary<string, string> inputs = new Dictionary<string, string>();

    static string processSignal(string type, string input1, string input2)
    {
        string signal = "";

        for (int i = 0; i < inputs[input1].Length; i++)
        {
            bool isInput1True = inputs[input1][i] == '-';
            bool isInput2True = inputs[input2][i] == '-';
            bool isTrue = gates[type](isInput1True, isInput2True);

            signal += isTrue ? '-' : '_';
        }

        return signal;
    }

    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        int m = int.Parse(Console.ReadLine());
        
        for (int i = 0; i < n; i++)
        {
            string[] signal = Console.ReadLine().Split(' ');
            inputs.Add(signal[0], signal[1]);
        }

        for (int i = 0; i < m; i++)
        {
            string[] line = Console.ReadLine().Split(' ');
            
            // output name, type, input1, input2
            Console.WriteLine(line[0] + " " + processSignal(line[1], line[2], line[3]));
        }
    }
}