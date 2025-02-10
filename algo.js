//PENDING FOR THE DEV, HE/SHE SHOULD TOUCH IT...!
const fs = require('fs');


async function readFileContent(filePath, callback) {
    await fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        callback(data);
    });
}

async function compareFiles(file1, file2) {
    console.log("reached here")
    await readFileContent(file1, (file1Content) => {
        console.log("reaached here 1")
         readFileContent(file2, (file2Content) => { //UMM AWAIT NEEDED HERE
            console.log(file1Content)
            console.log()
            console.log(file2Content)
            if (file1Content === file2Content) {
                console.log('Match found!');
            } else {
                console.log('No match!');
            }
        });
    });

}


module.exports={
    compareFiles: compareFiles
};
