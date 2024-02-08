import java.util.Arrays;
import java.util.Scanner;

class AsciiArt {
    private int charWidth;
    private int charHeight;
    private String text;
    private int[] letterStartingPositions ;
    private String art;
    private char[] alphabet;

    private void validateInput() {
        if (charWidth <= 0 || charHeight <= 0) {
            throw new IllegalArgumentException("Width and height must be positive integers.");
        }
        if (text.isEmpty()) {
            throw new IllegalArgumentException("Input text cannot be empty.");
        }
    }

    // Calculates starting positions of letters in each row
    private void getLetterStartingPositions() {
        int textLength = text.length();
        letterStartingPositions  = new int[textLength];

        for (int i = 0; i < textLength; i++) {
            String charAtIndex = String.valueOf(text.charAt(i));
            boolean isValidLetter = new String(alphabet).contains(charAtIndex);
            if (isValidLetter) {
                // the index of character multiplied by charWidth
                letterStartingPositions[i] = (Arrays.binarySearch(alphabet, text.charAt(i)) + 1) * charWidth - charWidth;
            } else {
                // the index of the not found char at the end multiplied by length
                letterStartingPositions[i] = alphabet.length * charWidth - charWidth;
            }
        }
    }

    // Slices letters from each row and appends them to ASCII art
    private StringBuilder sliceLetters(StringBuilder asciiArt, String row) {
        for (int i = 0; i < letterStartingPositions.length; i++) {
            String section = row.substring(letterStartingPositions[i], letterStartingPositions[i] + charWidth);
            asciiArt.append(section);
        }
        asciiArt.append("\n");

        return asciiArt;
    }

    public void readInputs() {
        Scanner scanner = new Scanner(System.in);

        this.charWidth = scanner.nextInt();
        this.charHeight = scanner.nextInt();

        if (scanner.hasNextLine()) {
            scanner.nextLine();
        }

        this.text = scanner.nextLine().toUpperCase();
        validateInput();
        getLetterStartingPositions();

        StringBuilder asciiArt = new StringBuilder();
        for (int i = 0; i < charHeight; i++) {
            String row = scanner.nextLine();
            asciiArt = sliceLetters(asciiArt, row);
        }
        this.art = asciiArt.toString();

        scanner.close();
    }

    public void setAlphabet(String alphabetString) {
        this.alphabet = alphabetString.toCharArray();
    }

    // Getter for ASCII art
    public String getArt() {
        return art;
    }
}

public class Solution {
    public static void main(String[] args) {
        AsciiArt asciiArt = new AsciiArt();
        asciiArt.setAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ?");
        asciiArt.readInputs();
        System.out.println(asciiArt.getArt());
    }
}