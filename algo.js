//PENDING FOR THE DEV, HE/SHE SHOULD TOUCH IT...!
const fs = require('fs');
const compareStrings = require('compare-strings');


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
            console.log(typeof(file1Content))
            console.log()
            console.log(typeof(file2Content))
            // console.log(file2Content)
            // console.log(file1Content === file2Content)
            // if (file1Content.toLowerCase() === file2Content.toLowerCase()) {
            //     console.log('Match found!');
            // } else {
            //     console.log('No match!');
            // }
            const result = compareStrings(file1Content,file2Content);
            if(result==1){
                console.log("Nasty Copy")
            }else if(result>=0.5){
                console.log("Nasty Hate words Detected")
            }else{
                console.log("No nasty Hate words buddy")
            }
        });
    });

}




module.exports={
    compareFiles: compareFiles
};
