const DIGITS_INT = 20;
const DIGITS_BIGINT = BigInt(DIGITS_INT);

function createTwoWayMap() {
    // Mapping between keys and values in both directions
    const forwardMap = new Map();
    const reverseMap = new Map();

    function put(key, value) {
        forwardMap.set(key, value);
        reverseMap.set(value, key);
    }

    function getValue(key) {
        return forwardMap.get(key);
    }

    function getKey(value) {
        return reverseMap.get(value);
    }

    return { forwardMap, reverseMap, put, getValue, getKey };
}

// Define a function to evaluate mathematical expressions
function evaluateExpression(operand1, operand2, operation) {
    switch (operation) {
        case "+": return operand1 + operand2;
        case "-": return operand1 - operand2;
        case "*": return operand1 * operand2;
        case "/":
            if (operand2 !== 0n) {
                return operand1 / operand2;
            }
            throw new Error("Division by zero. Operands: " + operand1 + ", " + operand2);
        default: return 0n;
    }
}

// Split the line to get the appropriate part of the numeral, append \n for formatting
function splitLine(line, index, width) {
    return line.substring(index * width, (index + 1) * width) + "\n";
}

function initNumeralMap(width, height) {
    const map = createTwoWayMap();
    const lines = [];

    // Read the numeral list first
    for (let i = 0; i < height; i++) {
        lines[i] = readline();
    }

    // Process the numeral list
    for (let i = 0; i < 20; i++) {
        let numeralBuilder = '';

        for (let j = 0; j < height; j++) {
            const part = splitLine(lines[j], i, width);
            numeralBuilder += part;
        }

        map.put(numeralBuilder, BigInt(i));
    }

    return map;
}

// Read a Mayan or base 20 number from the console
function readMayanNumber(height, width, numeralMap) {
    const numHeight = parseInt(readline()) / height;
    let num = 0n;

    // Iterate in reverse order since the higher-order digits of the number are processed first
    for (let i = numHeight - 1; i >= 0; i--) {
        let numeralBuilder = '';

        for (let j = 0; j < height; j++) {
            const line = readline();
            const part = splitLine(line, 0, width);
            numeralBuilder += part;
        }

        num += numeralMap.getValue(numeralBuilder) * DIGITS_BIGINT ** BigInt(i);
    }

    return num;
}

// Calculate the result in Mayan representation
function calculateResult(operand1, operand2, operation, numeralMap) {
    let number = evaluateExpression(operand1, operand2, operation);
    let mayanNumber = '';

    if (number === 0n) {
        return numeralMap.getKey(0n) || '';
    }

    while (number !== 0n) {
        // Insert the division remainder
        mayanNumber = numeralMap.getKey(number % DIGITS_BIGINT) + mayanNumber;

        // Continue with the quotient
        number = number / DIGITS_BIGINT;
    }

    return mayanNumber;
}

try {
    const widthHeight = readline().split(' ');
    const width = parseInt(widthHeight[0]);
    const height = parseInt(widthHeight[1]);
    const numeralMap = initNumeralMap(width, height);

    const operand1 = readMayanNumber(height, width, numeralMap);
    const operand2 = readMayanNumber(height, width, numeralMap);
    const operation = readline();

    const result = calculateResult(operand1, operand2, operation, numeralMap);
    console.log(result);
}
catch (e) {
    console.error("Error occurred: " + e.message);
}