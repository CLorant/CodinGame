import java.util.Scanner;
import java.util.HashMap;
import java.math.BigInteger;

class TwoWayMap<Key, Value> {
    // Mapping between keys and values in both directions
    private final HashMap<Key, Value> forwardMap = new HashMap<>();
    private final HashMap<Value, Key> reverseMap = new HashMap<>();

    public void put(Key key, Value value) {
        forwardMap.put(key, value);
        reverseMap.put(value, key);
    }

    public Value getValue(Key key) {
        return forwardMap.get(key);
    }

    public Key getKey(Value value) {
        return reverseMap.get(value);
    }
}

class MayanNum {
    public static final int DIGITS_INT = 20;
    public static final BigInteger DIGITS_BIGINT = BigInteger.valueOf(DIGITS_INT);
    private TwoWayMap<String, BigInteger> mayanNumeralMap;
    private BigInteger operand1;
    private BigInteger operand2;
    private String operation;
    private String result;

    public MayanNum(TwoWayMap<String, BigInteger> mayanNumeralMap, BigInteger operand1, BigInteger operand2, String operation) {
        this.mayanNumeralMap = mayanNumeralMap;
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operation = operation;
        this.result = calculateResult(this.operand1, this.operand2, this.operation);
    }

    public String getResult() {
        return result;
    }

    private BigInteger evaluateExpression(BigInteger operand1, BigInteger operand2, String operation) {
        switch (operation) {
            case "+": return operand1.add(operand2);
            case "-": return operand1.subtract(operand2);
            case "*": return operand1.multiply(operand2);
            case "/":
                if (!operand2.equals(BigInteger.ZERO)) {
                    return operand1.divide(operand2);
                }
                throw new ArithmeticException("Division by zero. Operands: " + operand1 + ", " + operand2);
            default: return BigInteger.ZERO;
        }
    }

    // Calculate the result in Mayan representation
    private String calculateResult(BigInteger operand1, BigInteger operand2, String operation) {
        BigInteger number = evaluateExpression(operand1, operand2, operation);
        StringBuilder mayanNumber = new StringBuilder();

        if (number.equals(BigInteger.ZERO)) {
            return mayanNumeralMap.getKey(BigInteger.ZERO);
        }

        while (!number.equals(BigInteger.ZERO)) {
            BigInteger[] divisionAndRemainder = number.divideAndRemainder(DIGITS_BIGINT);

            // Insert the division remainder
            mayanNumber.insert(0, mayanNumeralMap.getKey(divisionAndRemainder[1]));

            // Continue with the quotient
            number = divisionAndRemainder[0];
        }

        return mayanNumber.toString();
    }
}

public class Solution {
    private static TwoWayMap<String, BigInteger> numeralMap;

    public static void main(String args[]) {
        try (Scanner in = new Scanner(System.in)) {
            int width = in.nextInt();
            int height = in.nextInt();
            numeralMap = initNumeralMap(in, width, height);

            BigInteger operand1 = readMayanNumber(in, height, width);
            BigInteger operand2 = readMayanNumber(in, height, width);
            String operation = in.next();

            MayanNum mayanNumeral = new MayanNum(numeralMap, operand1, operand2, operation);
            String result = mayanNumeral.getResult();
            System.out.println(result);
        }
        catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
        }
    }

    private static TwoWayMap<String, BigInteger> initNumeralMap(Scanner in, int height, int width) {
        TwoWayMap<String, BigInteger> map = new TwoWayMap<>();
        String[] lines = new String[height];

        // Read the numeral list first
        for (int i = 0; i < height; i++) {
            lines[i] = in.next();
        }

        // Process the numeral list
        for (int i = 0; i < MayanNum.DIGITS_INT; i++) {
            StringBuilder numeralBuilder = new StringBuilder();

            for (int j = 0; j < height; j++) {
                String part = splitLine(lines[j], i, width);
                numeralBuilder.append(part);
            }

            map.put(numeralBuilder.toString(), BigInteger.valueOf(i));
        }

        return map;
    }

    // Read a Mayan or base 20 number from the console
    private static BigInteger readMayanNumber(Scanner in, int height, int width) {
        int numHeight = in.nextInt() / height;
        BigInteger num = BigInteger.ZERO;

        // Iterate in reverse order since the higher-order digits of the number are processed first
        for (int i = numHeight - 1; i >= 0; i--) {
            StringBuilder numeralBuilder = new StringBuilder();

            for (int j = 0; j < height; j++) {
                String line = in.next();
                String part = splitLine(line, 0, width);
                numeralBuilder.append(part);
            }

            String numeral1 = numeralBuilder.toString();
            num = num.add(numeralMap.getValue(numeral1)
                     .multiply(MayanNum.DIGITS_BIGINT.pow(i)));
        }

        return num;
    }

    // Split the line to get the appropriate part of the numeral, append \n for formatting
    private static String splitLine(String line, int index, int width) {
        return line.substring(index * width, (index + 1) * width) + "\n";
    }
}