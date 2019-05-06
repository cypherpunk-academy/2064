const fs = require('fs');
const language = process.argv[2];

const readFile = async (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, fileData) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileData);
        });
    });
}

const writeFile = async (fileName, fileData) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, fileData, 'utf8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

(async () => {
    const regexChapter = RegExp('\{([^\}\{}]+)\}{3,4}([^\{]*)\{', 'g');
    let regexArray;
    const bookText = await readFile(`texts/2064_${language}.txt`);

    while ((regexArray = regexChapter.exec(bookText)) !== null) {
        const fileName = regexArray[1];
        const fileData = regexArray[2];
        await writeFile(fileName, fileData);
        console.log(`Writing '${fileName}'. Next entry: ${regexChapter.lastIndex}`);
    }
})();