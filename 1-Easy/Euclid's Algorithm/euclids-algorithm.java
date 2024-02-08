import java.util.Scanner;

class Solution {

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        int firstNumber = scanner.nextInt();
        int secondNumber = scanner.nextInt();
        
        int gcd = getGCD(firstNumber, secondNumber);
        String result = formatResult(firstNumber, secondNumber, gcd);
        System.out.println(result);
        scanner.close();
    }

    // Recursively calculates the GCD of 2 numbers using Euclid's algorithm, printing each step to the console
    static int getGCD(int firstNumber, int secondNumber) {
        int divisor = firstNumber / secondNumber;
        int remainder = firstNumber % secondNumber;

        String step = formatStep(firstNumber, secondNumber, divisor, remainder);
        System.out.println(step);

        if (remainder != 0) {
            firstNumber = secondNumber;
            secondNumber = remainder;
            return getGCD(firstNumber, secondNumber);
        }

        return secondNumber;
    }

    static String formatStep(int firstNumber, int secondNumber, int divisor, int remainder) {
        return String.format("%d=%d*%d+%d",
            firstNumber, secondNumber, divisor, remainder);
    }

    static String formatResult(int firstNumber, int secondNumber, int gcd) {
        return String.format("GCD(%d,%d)=%d",
            firstNumber, secondNumber, gcd);
    }
}