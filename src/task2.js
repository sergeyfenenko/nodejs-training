const csv=require('csvtojson');
const fs=require('fs');

const csvReadStream=fs.createReadStream('./csv/test.csv');

convertViaPipe();
convertByLine();

// convert via pipe read and write stream
function convertViaPipe() {
    const jsonPipewriteStream=fs.createWriteStream('./csv/testWithPipe.json');
    csvReadStream.on('error', (error)=>{console.error(error)})
    jsonPipewriteStream.on('error', (error)=>{console.error(error)})
    csvReadStream.pipe(csv()).pipe(jsonPipewriteStream);
} 

//convert via red line by line
function convertByLine() {
    const jsonWriteStream=fs.createWriteStream('./csv/test.json');
    csv()
    .fromStream(csvReadStream)
    .subscribe((json)=>{
        return new Promise(function(resolve,reject){
            jsonWriteStream.on('error', function(){reject});
            jsonWriteStream.write(JSON.stringify(json),function(){resolve});
        })
    },function(err){console.log(err)},parseCompleted);
    
    function parseCompleted() {
        jsonWriteStream.end();
        console.log('Completed');
    }
}


