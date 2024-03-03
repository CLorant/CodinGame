using System;

public class Property
{
    public string Name { get; private set; }
    public string Value { get; private set; }

    public Property(string Name, string Value)
    {
        this.Name = Name;
        this.Value = Value;
    }
}

class Person
{
    public string Name { get; private set; }
    public Property[] Properties { get; private set; }

    public Person(string Line, string[] PropertyNames)
    {
        String[] Elements = Line.Split(" ");
        this.Name = Elements[0];
        this.Properties = new Property[PropertyNames.Length];

        for (int i = 0; i < PropertyNames.Length; i++)
        {
            Properties[i] = new Property(PropertyNames[i], Elements[i + 1]);
        }
    }
}

class Formula
{
    public Property[] Properties { get; private set; }

    public Formula(String Line)
    {
        // Split the line into properties
        String[] Elements = Line.Split(" AND ");
        this.Properties = new Property[Elements.Length];

        for (int i = 0; i < Elements.Length; i++)
        {
            // Split the property into name and value
            String[] property = Elements[i].Split("=");

            Properties[i] = new Property(property[0], property[1]);
        }
    }
}

class Solution
{
    static void Main(string[] args)
    {
        string[] PropertyNames = ReadPropertyNames();
        Person[] People = ReadPeople(PropertyNames);
        Formula[] Formulas = ReadFormulas();
        
        PrintResult(Formulas, People);
    }

    private static string[] ReadPropertyNames()
    {
        int PropertyCount = Convert.ToInt32(Console.ReadLine());
        string[] PropertyNames = new string[PropertyCount];

        for (int i = 0; i < PropertyCount; i++)
        {
            PropertyNames[i] = Console.ReadLine();
        }

        return PropertyNames;
    }

    private static Person[] ReadPeople(string[] PropertyNames)
    {
        int PersonCount = Convert.ToInt32(Console.ReadLine());
        Person[] People = new Person[PersonCount];

        for (int i = 0; i < PersonCount; i++)
        {
            People[i] = new Person(Console.ReadLine(), PropertyNames);
        }

        return People;
    }

    private static Formula[] ReadFormulas()
    {
        int FormulaCount = Convert.ToInt32(Console.ReadLine());
        Formula[] Formulas = new Formula[FormulaCount];

        for (int i = 0; i < FormulaCount; i++)
        {
            Formulas[i] = new Formula(Console.ReadLine());
        }

        return Formulas;
    }

    // Iterates through the formulas and people, incrementing matchingCount if the given person's properties fit the formula
    // Finally, it logs the number of people who match to the console per formula
    private static void PrintResult(Formula[] Formulas, Person[] People)
    {
        foreach (Formula Formula in Formulas)
        {
            int MatchingCount = 0;

            foreach (Person Person in People)
            {
                if (MatchesFormula(Formula, Person))
                {
                    MatchingCount++;
                }
            }
            
            Console.WriteLine(MatchingCount);
        }
    }

    // Iterates through the formula's and person's properties, and checks if the names and values match. 
    private static bool MatchesFormula(Formula Formula, Person Person)
    {
        foreach (Property FormulaProperty in Formula.Properties)
        {
            bool PropertyMatched = false;

            foreach (Property PersonProperty in Person.Properties)
            {
                bool NameMatches = FormulaProperty.Name == PersonProperty.Name;
                bool ValueMatches = FormulaProperty.Value == PersonProperty.Value;

                if (NameMatches && ValueMatches)
                {
                    PropertyMatched = true;
                    break;
                }
            }

            if (!PropertyMatched)
            {
                return false;
            }
        }
        
        return true;
    }
}