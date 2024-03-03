class Property {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }
}

class Person {
    constructor(line, propertyNames) {
        const elements = line.split(" ");
        this.name = elements[0];
        this.properties = [];

        for (let i = 0; i < propertyNames.length; i++) {
            this.properties[i] = new Property(propertyNames[i], elements[i + 1]);
        }
    }

    getName() {
        return this.name;
    }

    getProperties() {
        return this.properties;
    }
}

class Formula {
    constructor(line) {
        // Split the line into properties
        const elements = line.split(" AND ");
        this.properties = [];

        for (let i = 0; i < elements.length; i++) {
            // Split the property into name and value
            const property = elements[i].split("=");
            this.properties[i] = new Property(property[0], property[1]);
        }
    }

    getProperties() {
        return this.properties;
    }
}

class Solution {
    static main() {
        const propertyNames = this.readPropertyNames();
        const people = this.readPeople(propertyNames);
        const formulas = this.readFormulas();

        this.printResult(formulas, people);
    }

    static readPropertyNames() {
        const propertyCount = parseInt(readline());
        const propertyNames = [];

        for (let i = 0; i < propertyCount; i++) {
            propertyNames[i] = readline();
        }

        return propertyNames;
    }

    static readPeople(propertyNames) {
        const personCount = parseInt(readline());
        const people = [];

        for (let i = 0; i < personCount; i++) {
            people[i] = new Person(readline(), propertyNames);
        }

        return people;
    }

    static readFormulas() {
        const formulaCount = parseInt(readline());
        const formulas = [];

        for (let i = 0; i < formulaCount; i++) {
            formulas[i] = new Formula(readline());
        }

        return formulas;
    }

    // Iterates through the formulas and people, incrementing matchingCount if the given person's properties fit the formula
    // Finally, it logs the number of people who match to the console per formula
    static printResult(formulas, people) {
        for (const formula of formulas) {
            let matchingCount = 0;

            for (const person of people) {
                if (this.matchesFormula(formula, person)) {
                    matchingCount++;
                }
            }
            
            console.log(matchingCount);
        }
    }

    // Iterates through the formula's and person's properties, and checks if the names and values match. 
    static matchesFormula(formula, person) {
        const formulaProperties = formula.getProperties();
        const personProperties = person.getProperties();

        for (const formulaProperty of formulaProperties) {
            let propertyMatched = false;

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