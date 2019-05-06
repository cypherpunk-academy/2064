const fs = require('fs');

fs.readdir('.', (err, files) => {
    files.filter(file => parseInt(file) > 0).sort().forEach((file, i) => {
        // rename them
        const index = i + 1001;
        const newFile = file.replace(/^[^_]+(_[\w\W]*)$/, `${index.toString().substr(1,3)}$1`);

        fs.rename(file, newFile, err => err && console.error(err));
    });
});