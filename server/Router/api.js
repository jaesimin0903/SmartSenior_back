//import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
//import readline from "readline";

const express = require('express');
const router = express.Router();

router.get("/", async (req,res) =>{
    console.log("req.params", req.query.chat);
    const chat = await recursiveAsyncReadLine(req.query.chat);
    res.send({chat: chat});
    //console.log(chat);
});

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


let completion = [];
let input = "";

async function gpt(input) { 
  completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role:"system",content:"너는 최신기술에 약한 노인을 도와주는 챗봇이야."},
      {role:"system",content:"너의 이름은 시니어봇이야."},
      {role:"system", content:"https://goldenjob.or.kr/job/find-person.asp 에는 시니어 일자리 정보가 들어있어. 안에 정보를 확인해봐"},
      {role:"system",content:"맨 처음에는 \"무엇을 도와드릴까요?\" 라고대답해야해"},
      { role: "user", content: input }
    ],
  });
  return completion.data.choices[0].message;
  
}

var recursiveAsyncReadLine = async function (text){
  
    //input = answer;
    //console.log('Got it! Your answer was: "', answer, '"');
    const result= await gpt(text);
    //recursiveAsyncReadLine(); //Calling this function again to ask new question
    //rl.close();
  return result;
};

//recursiveAsyncReadLine();

module.exports = router;
