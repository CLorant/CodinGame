class Property {
    private name: string;
    private value: string;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): string {
        return this.value;
    }
}

class Person {
    private name: string;
    private properties: Property[];

    public constructor(line: string, propertyNames: string[]) {
        const elements = line.split(" ");
        this.name = elements[0];
        this.properties = [];

        for (let i = 0; i < propertyNames.length; i++) {
            this.properties[i] = new Property(propertyNames[i], elements[i + 1]);
        }
    }

    public getName(): string {
        return this.name;
    }

    public getProperties(): Property[] {
        return this.properties;
    }
}

class Formula {
    private properties: Property[];

    public constructor(line: string) {
        // Split the line into properties
        const elements = line.split(" AND ");
        this.properties = [];

        for (let i = 0; i < elements.length; i++) {
            // Split the property into name and value
            const property = elements[i].split("=");
            this.properties[i] = new Property(property[0], property[1]);
        }
    }

    public getProperties(): Property[] {
        return this.properties;
    }
}

class Solution {
    public static main() {
        const propertyNames = this.readPropertyNames();
        const people = this.readPeople(propertyNames);
        const formulas = this.readFormulas();

        this.printResult(formulas, people);
    }

    private static readPropertyNames(): string[] {
        const propertyCount = parseInt(readline());
        const propertyNames = [];

        for (let i = 0; i < propertyCount; i++) {
            propertyNames[i] = readline();
        }

        return propertyNames;
    }

    private static readPeople(propertyNames: string[]): Person[] {
        const personCount = parseInt(readline());
        const people = [];

        for (let i = 0; i < personCount; i++) {
            people[i] = new Person(readline(), propertyNames);
        }

        return people;
    }

    private static readFormulas(): Formula[] {
        const formulaCount = parseInt(readline());
        const formulas = [];

        for (let i = 0; i < formulaCount; i++) {
            formulas[i] = new Formula(readline());
        }

        return formulas;
    }

    // Iterates through the formulas and people, incrementing matchingCount if the given person's properties fit the formula
    // Finally, it logs the number of people who match to the console per formula
    private static printResult(formulas: Formula[], people: Person[]) {
        for (const formula of formulas) {
            let matchingCount: number = 0;

            for (const person of people) {
                if (this.matchesFormula(formula, person)) {
                    matchingCount++;
                }
            }
            
            console.log(matchingCount);
        }
    }

    // Iterates through the formula's and person's properties, and checks if the names and values match. 
    private static matchesFormula(formula: Formula, person: Person): boolean {
        const formulaProperties = formula.getProperties();
        const personProperties = person.getProperties();

        for (const formulaProperty of formulaProperties) {
            let propertyMatched: boolean = false;

            for (const personProperty of personProperties) {
                const nameMatches = formulaProperty.getName() === personProperty.getName();
                const valueMatches = formulaProperty.getValue() === personProperty.getValue();

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

Solution.main();