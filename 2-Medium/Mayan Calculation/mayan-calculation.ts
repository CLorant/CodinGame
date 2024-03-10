interface TwoWayMapInterface<Key, Value> {
    forwardMap: Map<Key, Value>;
    reverseMap: Map<Value, Key>;
    put(key: Key, value: Value): void;
    getValue(key: Key): Value | undefined;
    getKey(value: Value): Key | undefined;
}

class TwoWayMap<Key, Value> implements TwoWayMapInterface<Key, Value> {
    forwardMap: Map<Key, Value>;
    reverseMap: Map<Value, Key>;

    constructor() {
        this.forwardMap = new Map<Key, Value>();
        this.reverseMap = new Map<Value, Key>();
    }

    put(key: Key, value: Value): void {
        this.forwardMap.set(key, value);
        this.reverseMap.set(value, key);
    }

    getValue(key: Key): Value | undefined {
        return this.forwardMap.get(key);
    }

    getKey(value: Value): Key | undefined {
        return this.reverseMap.get(value);
    }
}

class MayanNum {
    static readonly DIGITS_INT: number = 20;
    static readonly DIGITS_BIGINT: bigint = BigInt(MayanNum.DIGITS_INT);
    private mayanNumeralMap: TwoWayMap<string, bigint>;
    private operand1: bigint;
    private operand2: bigint;
    private operation: string;
    private result: string;

    constructor(mayanNumeralMap: TwoWayMap<string, bigint>, operand1: bigint, operand2: bigint, operation: string) {
        this.mayanNumeralMap = mayanNumeralMap;
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operation = operation;
        this.result = this.calculateResult(this.operand1, this.operand2, this.operation);
    }

    getResult(): string {
        return this.result;
    }

    private evaluateExpression(operand1: bigint, operand2: bigint, operation: string): bigint {
        switch (operation) {
            case "+": return operand1 + operand2;
            case "-": return operand1 - operand2;
            case "*": return operand1 * operand2;
            case "/":
                if (operand2 !== BigInt(0)) {
                    return operand1 / operand2;
                }
                throw new Error("Division by zero. Operands: " + operand1 + ", " + operand2);
            default: return BigInt(0);
        }
    }

    private calculateResult(operand1: bigint, operand2: bigint, operation: string): string {
        let number: bigint = this.evaluateExpression(operand1, operand2, operation);
        let mayanNumber: string = '';

        if (number === BigInt(0)) {
            return this.mayanNumeralMap.getKey(BigInt(0)) || '';
        }

        while (number !== BigInt(0)) {
            // Insert the division remainder
            mayanNumber = this.mayanNumeralMap.getKey(number % MayanNum.DIGITS_BIGINT) + mayanNumber;

            // Continue with the quotient
            number = number / MayanNum.DIGITS_BIGINT;
        }

        return mayanNumber;
    }
}

class Solution {
    private static numeralMap: TwoWayMap<string, bigint>;

    public static main(): void {
        try {
            const widthHeight = readline().split(' ');
            const width: number = parseInt(widthHeight[0]);
            const height: number = parseInt(widthHeight[1]);
            Solution.numeralMap = Solution.initNumeralMap(width, height);

            const operand1: bigint = Solution.readMayanNumber(height, width);
            const operand2: bigint = Solution.readMayanNumber(height, width);
            const operation: string = readline();

            const mayanNumeral = new MayanNum(Solution.numeralMap, operand1, operand2, operation);
            const result: string = mayanNumeral.getResult();
            console.log(result);
        }
        catch (e) {
            console.error("Error occurred: " + e.message);
        }
    }

    private static initNumeralMap(height: number, width: number): TwoWayMap<string, bigint> {
        const map = new TwoWayMap<string, bigint>();
        const lines: string[] = [];

        // Read the numeral list first
        for (let i = 0; i < height; i++) {
            lines[i] = readline();
        }

        // Process the numeral list
        for (let i = 0; i < MayanNum.DIGITS_INT; i++) {
            let numeralBuilder: string = '';

            for (let j = 0; j < height; j++) {
                const part: string = Solution.splitLine(lines[j], i, width);
                numeralBuilder += part;
            }

            map.put(numeralBuilder, BigInt(i));
        }

        return map;
    }

    private static readMayanNumber(height: number, width: number): bigint {
        const numHeight: number = parseInt(readline()) / height;
        let num: bigint = BigInt(0);

        // Iterate in reverse order since the higher-order digits of the number are processed first
        for (let i = numHeight - 1; i >= 0; i--) {
            let numeralBuilder: string = '';

            for (let j = 0; j < height; j++) {
                const line = readline();
                const part = Solution.splitLine(line, 0, width);
                numeralBuilder += part;
            }

            num += Solution.numeralMap.getValue(numeralBuilder) * MayanNum.DIGITS_BIGINT ** BigInt(i);
        }

        return num;
    }

    // Split the line to get the appropriate part of the numeral, append \n for formatting
    private static splitLine(line: string, index: number, width: number): string {
        return line.substring(index * width, (index + 1) * width) + "\n";
    }
}

Solution.main();