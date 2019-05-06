    const fs = require('fs');
    const {
        execSync
    } = require('child_process');
    const languages = ['de', 'en'];

    const readChapters = async language => {
        return new Promise((resolve, reject) => {
            fs.readdir(language, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                files.filter(file => parseInt(file) > 0).sort();

                resolve(files);
            });
        });
    }

    const analyseFile = async (fileName) => {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, {}, (err, fileData) => {
                if (err) reject(err);
                else resolve({
                    len: fileData.length,
                    fileName,
                    fileData
                });
            });
        })
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
        for (language of languages) {
            const bookName = `2064_${language}`;
            console.time(bookName);

            const chapters = await readChapters(language);
            const analysisData = await Promise.all(chapters.map(chapter => analyseFile(`${language}/${chapter}`)));
            const analysis = analysisData.reduce((acc, data) => {
                return {
                    len: (acc.len || 0) + data.len
                }
            }, {});
            let i = 0;
            const bookText = analysisData.reduce((acc, data) => {
                console.log(i++, data.fileName);
                return `${acc}\n{{{${data.fileName}}}}\n${data.fileData}`;
            }, '');
            const cmd = `pandoc -o ../public/${bookName}.epub _title.md ${chapters.map(chapter => `"${chapter}"`).join(' ')}`;

            let ret;
            try {
                ret = execSync(cmd, {
                    cwd: language
                });
            } catch (err) {
                console.error(err);
                process.exit(1);
            }

            await writeFile(`texts/${bookName}.txt`, bookText);

            console.timeEnd(`${bookName}`);
            console.log(`${analysis.len} characters = €${Math.round((analysis.len / 500 * 0.01) * 100) / 100 }`);
        }
    })();