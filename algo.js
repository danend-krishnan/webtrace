// //PENDING FOR THE DEV, HE/SHE SHOULD TOUCH IT...!
// const fs = require('fs');
// const compareStrings = require('compare-strings');


// async function readFileContent(filePath, callback) {
//     await fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }
//         callback(data);
//     });
// }

// async function compareFiles(file1, file2) {
//     console.log("reached here")
//     await readFileContent(file1, (file1Content) => {
//         console.log("reaached here 1")
//          readFileContent(file2, (file2Content) => { //UMM AWAIT NEEDED HERE
//             console.log(typeof(file1Content))
//             console.log()
//             console.log(typeof(file2Content))
//             // console.log(file2Content)
//             // console.log(file1Content === file2Content)
//             // if (file1Content.toLowerCase() === file2Content.toLowerCase()) {
//             //     console.log('Match found!');
//             // } else {
//             //     console.log('No match!');
//             // }
//             const result = compareStrings(file1Content,file2Content);
//             if(result==1){
//                 console.log("Nasty Copy")
//             }else if(result>=0.5){
//                 console.log("Nasty Hate words Detected")
//             }else{
//                 console.log("No nasty Hate words buddy")
//             }
//         });
//     });

// }




// module.exports={
//     compareFiles: compareFiles
// };

//TF-IDF IMPLEMENTATION
const fs = require('fs');
const natural = require('natural'); // Install using npm install natural

// Function to compute TF-IDF vectors
function computeTFIDF(textArray) {
  const tfidf = new natural.TfIdf();
  textArray.forEach((text) => tfidf.addDocument(text));
  return tfidf;
}

// Function to compute cosine similarity between two texts
function cosineSimilarity(tfidf, index1, index2) {
  const vector1 = tfidf.documents[index1];
  const vector2 = tfidf.documents[index2];

  let dotProduct = 0, normA = 0, normB = 0;
  Object.keys(vector1).forEach((key) => {
    dotProduct += (vector1[key] || 0) * (vector2[key] || 0);
    normA += (vector1[key] || 0) ** 2;
    normB += (vector2[key] || 0) ** 2;
  });

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  return normA && normB ? dotProduct / (normA * normB) : 0;
}

// Function to compare scraped text with hate speech dataset
async function compareFiles(file1, file2) {
  try {
    console.log("Reading files for comparison...");

    const text1 = fs.readFileSync(file1, 'utf8').toLowerCase();
    const text2 = fs.readFileSync(file2, 'utf8').toLowerCase();

    const tfidf = computeTFIDF([text1, text2]);
    const similarity = cosineSimilarity(tfidf, 0, 1);

    console.log(`Cosine Similarity Score: ${similarity.toFixed(4)}`);

    const threshold = 0.5; // Adjust threshold based on testing
    if (similarity > threshold) {
      console.log("Hate Speech Detected!");
    } else {
      console.log("No Hate Speech Detected.");
    }
  } catch (error) {
    console.error("Error during file comparison:", error.message);
  }
}

module.exports = { compareFiles };


