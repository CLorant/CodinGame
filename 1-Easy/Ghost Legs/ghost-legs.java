import java.util.Scanner;
import java.util.Arrays;

class Solution {
    static final String REDIRECTION_SYMBOL = "--";
    static final String PATH_SYMBOL = "\\|"; // backslashes due to regex
    static final String PATH_SEPARATOR_SYMBOL = "  ";

    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        int width = scanner.nextInt(); // not needed but stored for consistency
        int height = scanner.nextInt();

        if (scanner.hasNextLine()) {
            scanner.nextLine();
        }

        String[] topLabels = scanner.nextLine().split(PATH_SEPARATOR_SYMBOL);
        int[] path = new int[topLabels.length];
        Arrays.setAll(path, i -> i);

        // Starts indexing from 1 to height - 1 to only read the paths
        for (int i = 1; i < height - 1; i++) {
            processPath(scanner.nextLine(), path);
        }

        String[] bottomLabels = scanner.nextLine().split(PATH_SEPARATOR_SYMBOL);

        printResult(topLabels, bottomLabels, path);
        scanner.close();
    }

    // Processes a path input, updating the path array if redirections are found
    static void processPath(String input, int[] path) {
        String[] line = input.split(PATH_SYMBOL);
        
        for (int i = 0; i < line.length; i++) {
            if (line[i].equals(REDIRECTION_SYMBOL)) {
                redirectPath(i, path);
            }
        }
    }

    // Updates the path array based on the redirection index
    static void redirectPath(int redirectIndex, int[] path) {
        for (int i = 0; i < path.length; i++) {

            // redirect to left or right
            if (path[i] == redirectIndex) {
                path[i]--;
            }
            else if (path[i] == redirectIndex - 1) {
                path[i]++;
            }
        }
    }

    // Prints the top labels in order, and the bottom label's elements by the order specified in the path array
    static void printResult(String[] topLabels, String[] bottomLabels, int[] path) {
        for (int i = 0; i < topLabels.length; i++) {
            System.out.println(topLabels[i] + bottomLabels[path[i]]);
        }
    }
}