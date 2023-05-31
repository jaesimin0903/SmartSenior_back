// Imports the Google Cloud client library
//const textToSpeech = require('@google-cloud/text-to-speech');
const textToSpeech =require('@google-cloud/text-to-speech');
// Import other required libraries


const fs = require('fs');
const util = require('util');
const path = require('path');
const player = require('play-sound')(opts = {});
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart(text_speech) {
  // The text to synthesize
  const text = text_speech;

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'ko-KR', ssmlGender: 'FEMALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'LINEAR16', speakingRate : 1},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  //const writeFile = util.promisify(fs.writeFile);
  //await writeFile('output.mp3', response.audioContent, 'binary');
  //console.log('Audio content written to file: output.mp3');
  //playAudio()
  console.log(response.audioContent);
  return response.audioContent;
}
//quickStart();

// async function playAudio(){
//     player.play('./output.mp3',function (err) { 
//         if(err) throw err;
//      })
// };


module.exports = quickStart;
//AIzaSyDqjdwkDm5LQByMPK-OEjEKLsOH_ZZ17CE