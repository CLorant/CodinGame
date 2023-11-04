function calculateMaxLoss(values, n) {
    let maxLoss = 0;
    let currentMax = values[0];

    for (let i = 1; i < n; i++) {
        if (values[i] > currentMax) {
            currentMax = values[i];
        }
        else {
            maxLoss = Math.max(maxLoss, currentMax - values[i]);
        }
    }

    return -maxLoss || 0;
}

const n = parseInt(readline());
const inputs = readline().split(' ').map(Number);

const maxLoss = calculateMaxLoss(inputs, n);
console.log(maxLoss);