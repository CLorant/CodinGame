import java.util.Scanner;
import java.util.Arrays;

class Solution {

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        int horseCount = scanner.nextInt();
        int[] horseStrengths = new int[horseCount];
        fillHorseStrengths(horseStrengths, horseCount, scanner);
        Arrays.sort(horseStrengths); // Sorts the horseStrengths array in ascending order
        
        int min = getClosestDifference(horseStrengths, horseCount);
        System.out.println(min);
    }

    // Populates the horseStrengths array
    static void fillHorseStrengths(int[] horseStrengths, int horseCount, Scanner scanner) {
        for (int i = 0; i < horseCount; i++)
        {
            horseStrengths[i] = scanner.nextInt();
        }
    }

    // Iterates over the horseStrengths array, substracting the next element from the current one and returns the closest difference
    static int getClosestDifference(int[] horseStrengths, int horseCount) {
        int min = Integer.MAX_VALUE;

        for (int i = 0; i < horseCount - 1; i++)
        {
            min = Math.min(min, horseStrengths[i + 1] - horseStrengths[i]);
        }

        return min;
    }
}