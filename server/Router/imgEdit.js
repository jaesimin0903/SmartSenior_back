const {spawn} = require('child_process');
const path = require('path');

const desiredPath = path.resolve(__dirname, '../imgEdit.py');
console.log(desiredPath)
async function imgEdit (imgBlob, text) {
    return new Promise((resolve, reject) =>{
        var dataToSend;
    const msg = text;
    console.log("img edit : ",text, "img URL : ", imgBlob);
    const python = spawn('python', [desiredPath,msg,imgBlob.path] );
    python.stdout.on('data', async function(data){
        dataToSend = data.toString();
        console.log("imgEdit start", dataToSend)
        resolve(dataToSend)
    })
    python.stdout.on('close', async function(data){
        console.log("imgEdit end ",data.toString())
        //return data.toString();
    })
    python.stderr.on("data", async function(data) {
        console.error("Python 에러: ", data.toString())
        reject(data.toString())
        
    });
    })
    
    
}



module.exports =imgEdit;