import java.util.Scanner;

class Defibrillator {
    public int id;
    public String name;
    public String address;
    public String phoneNumber;
    public double lon;
    public double lat;

    // Earth's radius in kilometers
    private final int EARTH_RADIUS = 6371;

    // Replaces the comma with a decimal point and converts the string to a double
    public static double formatDouble(String input) {
        String formattedString = input.replace(',', '.');

        return Double.parseDouble(formattedString);
    }

    // Finds the closest defibrillator based on the current location
    public static Defibrillator getClosestDefib(Scanner scanner, double currentLon, double currentLat, int defibCount) {
        Defibrillator closestDefib = null;
        double minDistance = Double.MAX_VALUE;

        for (int i = 0; i < defibCount; i++) {
            Defibrillator currentDefib = new Defibrillator(scanner.nextLine());
            double distance = currentDefib.calculateDistance(currentLon, currentLat);

            if (distance < minDistance) {
                minDistance = distance;
                closestDefib = currentDefib;
            }
        }

        scanner.close();

        return closestDefib;
    }

    // Calculates the distance between the current location and the defibrillator
    private double calculateDistance(double currentLon, double currentLat) {
        double lonDifference = lon - currentLon;
        double latAverage = (lat + currentLat) / 2;

        double x = lonDifference * Math.cos(latAverage);
        double y = lat - currentLat;

        return Math.hypot(x, y) * EARTH_RADIUS;
    }

    public Defibrillator(String line) {
        String[] inputs = line.split(";");

        this.id = Integer.parseInt(inputs[0]);
        this.name = inputs[1];
        this.address = inputs[2];
        this.phoneNumber = inputs[3];
        this.lon = formatDouble(inputs[4]);
        this.lat = formatDouble(inputs[5]);
    }
}

class Solution {

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        double currentLon = Defibrillator.formatDouble(scanner.next());
        double currentLat = Defibrillator.formatDouble(scanner.next());
        int defibCount = scanner.nextInt();

        if (scanner.hasNextLine()) {
            scanner.nextLine();
        }

        Defibrillator closestDefib = Defibrillator.getClosestDefib(scanner, currentLon, currentLat, defibCount);
        
        System.out.println(closestDefib.name);
        scanner.close();
    }
}