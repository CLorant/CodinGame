const n = parseInt(readline());
const q = parseInt(readline());
const extMIMEDict = {};

for (let i = 0; i < n; i++) {
    const inputs = readline().split(' ');
    const ext = inputs[0].toLowerCase();
    const mt = inputs[1];
    extMIMEDict[ext] = mt;
}

for (let i = 0; i < q; i++) {
    const fileName = readline();

    // if it doesn't contain a dot then it's incorrect, so UNKNOWN
    if (!fileName.includes('.')) {
        console.log("UNKNOWN");
        continue;
    }

    // split the filename at every dot, return the last element and convert that to lowercase
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (extMIMEDict[fileExtension]) {
        console.log(extMIMEDict[fileExtension]);
    }
    else {
        console.log("UNKNOWN");
    }
}