const {spawn} = require('child_process');
const imgEdit = require('./imgEdit.js');
const fs = require('fs');
const path = require('path');

const desiredPath = path.resolve(__dirname, '../txt2img.py');

async function img2txt (img, text) {
    console.log(img, text)
    var dataToSend;
    const python = spawn('python', [desiredPath,img] );
    python.stdout.on('data', function(data){
        dataToSend = data.toString();
        console.log("stdout on ", dataToSend)
        console.log("img2txt start")
    })
    python.stdout.on('close', async function(){
        console.log("img2txt end");
        return await imgEdit(text);
    })
    
}

module.exports =img2txt;