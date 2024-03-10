using System;
using System.Collections.Generic;
using System.Numerics;

public class TwoWayMap<Key, Value>
{
    // Mapping between keys and values in both directions
    private readonly Dictionary<Key, Value> forwardMap = new Dictionary<Key, Value>();
    private readonly Dictionary<Value, Key> reverseMap = new Dictionary<Value, Key>();

    public void Put(Key key, Value value)
    {
        forwardMap[key] = value;
        reverseMap[value] = key;
    }

    public Value GetValue(Key key)
    {
        return forwardMap[key];
    }

    public Key GetKey(Value value)
    {
        return reverseMap[value];
    }
}

public class MayanNum
{
    public static readonly int DigitsInt = 20;
    public static readonly BigInteger DigitsBigInt = new BigInteger(DigitsInt);

    private readonly TwoWayMap<string, BigInteger> mayanNumeralMap;
    private readonly BigInteger operand1;
    private readonly BigInteger operand2;
    private readonly string operation;
    private readonly string result;


    public MayanNum(TwoWayMap<string, BigInteger> mayanNumeralMap, BigInteger operand1, BigInteger operand2, string operation)
    {
        this.mayanNumeralMap = mayanNumeralMap;
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operation = operation;
        this.result = CalculateResult(this.operand1, this.operand2, this.operation);
    }

    public string GetResult()
    {
        return result;
    }

    private BigInteger EvaluateExpression(BigInteger operand1, BigInteger operand2, string operation)
    {
        switch (operation)
        {
            case "+": return operand1 + operand2;
            case "-": return operand1 - operand2;
            case "*": return operand1 * operand2;
            case "/":
                if (operand2 != BigInteger.Zero)
                {
                    return operand1 / operand2;
                }

                throw new ArithmeticException("Division by zero. Operands: " + operand1 + ", " + operand2);
            default: return BigInteger.Zero;
        }
    }

    // Calculate the result in Mayan representation
    private string CalculateResult(BigInteger operand1, BigInteger operand2, string operation)
    {
        BigInteger number = EvaluateExpression(operand1, operand2, operation);
        var mayanNumber = new System.Text.StringBuilder();

        if (number == BigInteger.Zero)
        {
            return mayanNumeralMap.GetKey(BigInteger.Zero);
        }

        while (number != BigInteger.Zero)
        {
            BigInteger remainder = 0;
            BigInteger quotient = BigInteger.DivRem(number, DigitsBigInt, out remainder);

            // Insert the division remainder
            mayanNumber.Insert(0, mayanNumeralMap.GetKey(remainder));

            // Continue with the quotient
            number = quotient;
        }

        return mayanNumber.ToString();
    }
}

public class Solution
{
    private static TwoWayMap<string, BigInteger> numeralMap;

    public static void Main(string[] args)
    {
        try
        {
            string[] widthHeight = Console.ReadLine().Split(" ");
            int width = Convert.ToInt16(widthHeight[0]);
            int height = Convert.ToInt16(widthHeight[1]);
            numeralMap = InitNumeralMap(width, height);

            BigInteger operand1 = ReadMayanNumber(height, width);
            BigInteger operand2 = ReadMayanNumber(height, width);
            string operation = Console.ReadLine();

            var mayanNumeral = new MayanNum(numeralMap, operand1, operand2, operation);
            string result = mayanNumeral.GetResult();
            Console.WriteLine(result);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine("Error occurred: " + e.Message);
        }
    }

    private static TwoWayMap<string, BigInteger> InitNumeralMap(int height, int width)
    {
        var map = new TwoWayMap<string, BigInteger>();
        string[] lines = new string[height];

        // Read the numeral list first
        for (int i = 0; i < height; i++)
        {
            lines[i] = Console.ReadLine();
        }

        // Process the numeral list
        for (int i = 0; i < MayanNum.DigitsInt; i++)
        {
            String numeralBuilder = "";

            for (int j = 0; j < height; j++)
            {
                string part = SplitLine(lines[j], i, width);
                numeralBuilder += part;
            }

            map.Put(numeralBuilder, new BigInteger(i));
        }

        return map;
    }

    // Read a Mayan or base 20 number from the console
    private static BigInteger ReadMayanNumber(int height, int width)
    {
        int numHeight = Convert.ToInt16(Console.ReadLine()) / height;
        BigInteger num = BigInteger.Zero;

        // Iterate in reverse order since the higher-order digits of the number are processed first
        for (int i = numHeight - 1; i >= 0; i--)
        {
            string numeralBuilder = "";

            for (int j = 0; j < height; j++)
            {
                string line = Console.ReadLine();
                string part = SplitLine(line, 0, width);
                numeralBuilder += part;
            }

            num += numeralMap.GetValue(numeralBuilder) * BigInteger.Pow(MayanNum.DigitsBigInt, i);
        }

        return num;
    }

    // Split the line to get the appropriate part of the numeral, append \n for formatting
    private static string SplitLine(string line, int index, int width)
    {
        return line.Substring(index * width, width) + "\n";
    }
}