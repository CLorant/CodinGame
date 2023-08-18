using System;
using System.Linq;
using System.Collections.Generic;

class Calculation
{
    public int start;
    public int end;

    public Calculation(int start, int duration) {
        this.start = start;
        this.end = start + duration - 1;
    }
}
class Solution
{
    static void Main(string[] args)
    {
        int N = int.Parse(Console.ReadLine());
        List<Calculation> calculations = new List<Calculation>();

        // reads the inputs and adds them to the list
        for (int i = 0; i < N; i++)
        {
            string[] inputs = Console.ReadLine().Split(' ');
            int J = int.Parse(inputs[0]);
            int D = int.Parse(inputs[1]);
            calculations.Add(new Calculation(J, D));
        }

        // sorts the list in ascending order by the "end" property
        calculations = calculations.OrderBy(x => x.end).ToList();
        int previousEnd = 0;
        int calculationCount = 0;

        // checks if the end of the previous calculation is smaller than the start of the current calculation
        foreach (Calculation calc in calculations)
        {
            if (previousEnd < calc.start)
            {
                calculationCount++;
                previousEnd = calc.end;
            }
        }

        Console.WriteLine(calculationCount);
    }
}