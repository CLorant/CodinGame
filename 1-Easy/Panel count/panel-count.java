import java.util.Scanner;

class Property {
    private String name;
    private String value;

    public Property(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }
}

class Person {
    private String name;
    private Property[] properties;

    public Person(String line, String[] propertyNames) {
        String[] elements = line.split(" ");
        this.name = elements[0];
        this.properties = new Property[propertyNames.length];

        for (int i = 0; i < propertyNames.length; i++) {
            properties[i] = new Property(propertyNames[i], elements[i + 1]);
        }
    }

    public String getName() {
        return name;
    }

    public Property[] getProperties() {
        return properties;
    }
}

class Formula {
    private Property[] properties;

    public Formula(String line) {

        // Split the line into properties
        String[] elements = line.split(" AND ");
        this.properties = new Property[elements.length];

        for (int i = 0; i < elements.length; i++) {
            // Split the property into name and value
            String[] property = elements[i].split("=");

            properties[i] = new Property(property[0], property[1]);
        }
    }

    public Property[] getProperties() {
        return properties;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        String[] propertyNames = readPropertyNames(in);
        Person[] people = readPeople(in, propertyNames);
        Formula[] formulas = readFormulas(in);

        printResult(formulas, people);

        in.close();
    }

    private static String[] readPropertyNames(Scanner in) {
        int propertyCount = in.nextInt();
        String[] propertyNames = new String[propertyCount];

        if (in.hasNextLine()) {
            in.nextLine();
        }

        for (int i = 0; i < propertyCount; i++) {
            propertyNames[i] = in.nextLine();
        }

        return propertyNames;
    }

    private static Person[] readPeople(Scanner in, String[] propertyNames) {
        int personCount = in.nextInt();
        Person[] people = new Person[personCount];

        if (in.hasNextLine()) {
            in.nextLine();
        }

        for (int i = 0; i < personCount; i++) {
            people[i] = new Person(in.nextLine(), propertyNames);
        }

        return people;
    }

    private static Formula[] readFormulas(Scanner in) {
        int formulaCount = in.nextInt();
        Formula[] formulas = new Formula[formulaCount];

        if (in.hasNextLine()) {
            in.nextLine();
        }
        
        for (int i = 0; i < formulaCount; i++) {
            formulas[i] = new Formula(in.nextLine());
        }

        return formulas;
    }

    // Iterates through the formulas and people, incrementing matchingCount if the given person's properties fit the formula
    // Finally, it logs the number of people who match to the console per formula
    private static void printResult(Formula[] formulas, Person[] people) {
        for (Formula formula : formulas) {
            int matchingCount = 0;

            for (Person person : people) {
                if (matchesFormula(formula, person)) {
                    matchingCount++;
                }
            }
            
            System.out.println(matchingCount);
        }
    }

    // Iterates through the formula's and person's properties, and checks if the names and values match. 
    private static boolean matchesFormula(Formula formula, Person person) {
        Property[] formulaProperties = formula.getProperties();
        Property[] personProperties = person.getProperties();

        for (Property formulaProperty : formulaProperties) {
            boolean propertyMatched = false;

            for (Property personProperty : personProperties) {
                boolean nameMatches = formulaProperty.getName().equals(personProperty.getName());
                boolean valueMatches = formulaProperty.getValue().equals(personProperty.getValue());

                if (nameMatches && valueMatches) {
                    propertyMatched = true;
                    break;
                }
            }

            if (!propertyMatched) {
                return false;
            }
        }
        
        return true;
    }
}