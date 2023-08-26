const n: number = parseInt(readline());
let closest: number = 0;

if (n !== 0) {
    const inputs: number[] = readline().split(' ').map(Number);

    // sorts in ascending order if the absolute values of the numbers does not equal 0
    // otherwise, sorts in descending order, this way positives come before negatives
    inputs.sort((a, b) => Math.abs(a) - Math.abs(b) || b - a);
    closest = inputs[0];
}
console.log(closest);