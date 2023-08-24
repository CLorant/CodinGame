const n: number = parseInt(readline());
const q: number = parseInt(readline());
const extMIMEDict: { [key: string]: string } = {};

for (let i = 0; i < n; i++) {
    const inputs: string[] = readline().split(' ');
    const ext: string = inputs[0].toLowerCase();
    const mt: string = inputs[1];
    extMIMEDict[ext] = mt;
}

for (let i = 0; i < q; i++) {
    const fileName: string = readline();

    // if it doesn't contain a dot then it's incorrect, so UNKNOWN
    if (!fileName.includes('.')) {
        console.log("UNKNOWN");
        continue;
    }

    // split the filename at every dot, return the last element and convert that to lowercase
    const fileExtension: string = fileName.split('.').pop().toLowerCase();

    if (extMIMEDict[fileExtension]) {
        console.log(extMIMEDict[fileExtension]);
    }
    else {
        console.log("UNKNOWN");
    }
}