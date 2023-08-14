const MESSAGE = readline();
let encoded = "";
let prev = -1;
for (let i = 0; i < MESSAGE.length; i++) {
    for (let j = 6; j >= 0; j--) {
        let bit = MESSAGE.charCodeAt(i) >> j & 1;
        if (bit !== prev) {
            if (-1 !== prev) {
                encoded += " ";
            }
            encoded += 1 == bit ? "0 " : "00 ";
            prev = bit;
        }
        encoded += "0";
    }
}
console.log(encoded);