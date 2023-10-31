function GCD(a: number, b: number): number {
    const divisor = Math.floor(a / b);
    const remainder = a % b;

    console.log(`${a}=${b}*${divisor}+${remainder}`);

    if (remainder == 0) {
        return b;
    }
    else {
        a = b;
        b = remainder;
        return GCD(a, b);
    }
}

const inputs = readline().split(' ');
const a = parseInt(inputs[0]);
const b = parseInt(inputs[1]);

const gcd = GCD(a, b);
console.log(`GCD(${a},${b})=${gcd}`);