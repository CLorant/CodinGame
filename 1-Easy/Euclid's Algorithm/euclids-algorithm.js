// Recursively calculates the GCD of 2 numbers using Euclid's algorithm, printing each step to the console
function getGCD(firstNumber, secondNumber) {
    const divisor = Math.floor(firstNumber / secondNumber);
    const remainder = firstNumber % secondNumber;

    console.log(`${firstNumber}=${secondNumber}*${divisor}+${remainder}`);

    if (remainder != 0) {
        firstNumber = secondNumber;
        secondNumber = remainder;

        return getGCD(firstNumber, secondNumber);    
    }

    return secondNumber;
}

const inputs = readline().split(' ');
const firstNumber = parseInt(inputs[0]);
const secondNumber = parseInt(inputs[1]);
const gcd = getGCD(firstNumber, secondNumber);

console.log(`GCD(${firstNumber},${secondNumber})=${gcd}`);