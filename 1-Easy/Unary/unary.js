const MESSAGE = readline();
let encoded = "";
let prev = -1;
for (let i = 0; i < MESSAGE.length; i++) {
    for (let j = 6; j >= 0; j--) {
        // Get the j-th bit of the current character.
        let bit = MESSAGE.charCodeAt(i) >> j & 1;
        if (bit !== prev) {
            if (prev !== -1) {
                encoded += " ";
            }
            encoded += bit == 1 ? "0 " : "00 ";
            prev = bit;
        }
        encoded += "0";
    }
}
console.log(encoded);