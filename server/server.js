const express = require("express");
const app = express();
const { spawn } = require("child_process");
const test = require("./Router/test");
const chatgpt = require("./Router/api.js");
const quickStart = require("./Router/TTS.js");
const img2txt = require("./Router/img2txt.js");
const imgEdit = require("./Router/imgEdit.js");
const welfareGPT = require("./Router/seniorWelfare.js");
const generateIMGPrompt = require("./Router/generatePrompt.js");
const generateTextPrompt = require("./Router/generateTextPrompt.js");
const chat =require('./Router/chat.js');
const meme = require('./Router/meme.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');

const iconv = require("iconv").Iconv;
app.use(express.json());

let job_arr = null;

if(fs.existsSync('./crawl.py')){
  console.log("yes")
}
else{
  console.log("no")
}
// Run the crawling script to get data and store it in the global variable
const python = spawn("python", ["./crawl.py"]);
python.stdout.on("data", async function (data) {
  iconv1 = new iconv("euc-kr", "UTF-8");
  job_arr = iconv1.convert(data).toString();
  //console.log(job_arr);
});
python.stdout.on("close", async function (data) {});

app.use("/api", test);

app.get("/api/chatGPT", async(req,res)=>{
  console.log("Chat Prompt Arr",req.query.prompt);
  result = await chat(req.query.prompt);
  res.send(result);
});

app.get("/api/chatGPT/meme", async(req,res)=>{
  console.log("meme Prompt Arr",req.query.prompt);
  result = await meme(req.query.prompt);
  res.send(result);
});

app.get("/api/tts", async (req, res) => {
  console.log("tts req ", req.query.chat);
  let bufferData = await quickStart(req.query.chat);
  res.send(bufferData);
});

app.get("/api/img", async (req, res) => {
  
  console.log("start text to img", req.query.request.imgPrompt, req.query.request.textPrompt);
  //const result = await img2txt(req.query.request.imgPrompt, req.query.request.textPrompt);
  await img2txt(req.query.request.imgPrompt, req.query.request.textPrompt).then(async (response)=>{
      console.log("Success response : ", response)
      res.send(response)
  });

  

  //await imgEdit("테스트중이에요 자고 싶어요 되게해주세요")
});

app.post("/api/imgEdit", upload.single('image') ,async(req,res)=>{
  console.log(req.file, req.body.textPrompt);
  //console.log("img edit ",req.body.params.request.textPrompt );
  //console.log("start img edit", req.query.request.imgURL,req.query.request.textPrompt);
  await imgEdit(req.file,req.body.textPrompt).then(async (response) =>{
    console.log("IMG EDIT URL : ", response);
    res.send(response);
  })
});

app.get("/api/workGPT", async (req, res) => {
    console.log(req.query.prompt)
  if (!job_arr) {
    return res.status(500).send("Data is not available");
  }
  const python = spawn("python", [
    "./gpt.py",
    job_arr,req.query.prompt
  ]);
  python.stdout.on("data", async function (data) {
    iconv1 = new iconv("euc-kr", "UTF-8");
    answer = iconv1.convert(data).toString();
    console.log("job - arr",answer);
    res.send(answer)
  });
  python.on('error',(error)=>{
    console.error(`${error}`);
  })
  python.stdout.on("close", async function (data) {});
});

app.get("/api/welfareGPT", async (req,res) =>{
  console.log(req.query.prompt);
  const ans = await welfareGPT(req.query.prompt);
  res.send(ans);
})

app.get("/api/imgPrompt", async (req,res) =>{
  const ans = await generateIMGPrompt();
  res.send(ans);
})

app.get("/api/textPrompt", async (req,res) =>{
  console.log(req.query.request.text_case);
  const ans = await generateTextPrompt(req.query.request.text_case);
  res.send(ans);
})

const port = 5000;
app.listen(port, () => {
  console.log(`${port}`);
});
