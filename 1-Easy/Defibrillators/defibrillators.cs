using System;

class Defibrillator
{
    // the id, address and the phoneNumber fields are not needed to complete the task
    // but are still stored due to being present in the input

    public int id;
    public string name;
    public string address;
    public string phoneNumber;
    public double lon;
    public double lat;

    public static double formatLonLat(string input) {
        return Convert.ToDouble(input.Replace(',', '.'));
    }

    public double CalculateDistance(double userLon, double userLat)
    {
        double x = (lon - userLon) * Math.Cos((lat + userLat) / 2);
        double y = lat - userLat;
        return Math.Sqrt(Math.Pow(x, 2) + Math.Pow(y, 2)) * 6371;
    }

    public Defibrillator(string line)
    {
        string[] inputs = line.Split(';');
        id = Convert.ToInt32(inputs[0]);
        name = inputs[1];
        address = inputs[2];
        phoneNumber = inputs[3];
        lon = formatLonLat(inputs[4]);
        lat = formatLonLat(inputs[5]);
    }
}

class Solution
{
    static void Main(string[] args)
    {
        double userLon = Defibrillator.formatLonLat(Console.ReadLine());
        double userLat = Defibrillator.formatLonLat(Console.ReadLine());
        int n = Convert.ToInt32(Console.ReadLine());

        Defibrillator closestDef = null;
        double minDistance = double.MaxValue;

        for (int i = 0; i < n; i++)
        {
            Defibrillator currentDef = new Defibrillator(Console.ReadLine());
            double distance = currentDef.CalculateDistance(userLon, userLat);

            // minimum selection based on distance
            if (distance < minDistance)
            {
                minDistance = distance;
                closestDef = currentDef;
            }
        }

        Console.WriteLine(closestDef.name);
    }
}