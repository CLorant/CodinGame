using System;

class Defibrillator
{
    public int id;
    public string name;
    public string address;
    public string phoneNumber;
    public double lon;
    public double lat;

    // Earth's radius in kilometers
    private const int EARTH_RADIUS = 6371;

    // Replaces the comma with a decimal point and converts the string to a double
    public static double FormatDouble(string input)
    {
        string formattedString = input.Replace(',', '.');

        return Convert.ToDouble(formattedString);
    }

    // Finds the closest defibrillator based on the current location
    public static Defibrillator GetClosestDefib(double currentLon, double currentLat, int defibCount)
    {
        Defibrillator closestDef = null;
        double minDistance = double.MaxValue;

        for (int i = 0; i < defibCount; i++)
        {
            Defibrillator currentDef = new Defibrillator(Console.ReadLine());
            double distance = currentDef.CalculateDistance(currentLon, currentLat);

            if (distance < minDistance)
            {
                minDistance = distance;
                closestDef = currentDef;
            }
        }

        return closestDef;
    }

    // Calculates the distance between the current location and the defibrillator
    private double CalculateDistance(double currectLon, double currentLat)
    {
        double lonDifference = lon - currectLon;
        double latAverage = (lat + currentLat) / 2;

        double x = lonDifference * Math.Cos(latAverage);
        double y = lat - currentLat;

        double hypotenuse = Math.Sqrt(Math.Pow(x, 2) + Math.Pow(y, 2));

        return hypotenuse * EARTH_RADIUS;
    }

    public Defibrillator(string line)
    {
        string[] inputs = line.Split(';');
        id = Convert.ToInt32(inputs[0]);
        name = inputs[1];
        address = inputs[2];
        phoneNumber = inputs[3];
        lon = FormatDouble(inputs[4]);
        lat = FormatDouble(inputs[5]);
    }
}

class Solution
{
    static void Main(string[] args)
    {
        double currectLon = Defibrillator.FormatDouble(Console.ReadLine());
        double currentLat = Defibrillator.FormatDouble(Console.ReadLine());
        int defibCount = Convert.ToInt32(Console.ReadLine());

        Defibrillator closestDefib = Defibrillator.GetClosestDefib(currectLon, currentLat, defibCount);

        Console.WriteLine(closestDefib.name);
    }
}