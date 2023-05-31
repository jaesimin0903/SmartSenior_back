const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const system = [
  {
    role: "system",
    content:
      "당신은 10대와 20대처럼 대답하는 챗봇입니다. 자기소개는 하지않고 자연스러운 대답을한다. 친근하게 대한다. 조부모한테 말하듯이 약간의 경어체를 사용한다. 이모티콘을 사용한다.",
  }
];

// 텍스트 입력을 받아 GPT-3로 처리하고 결과를 반환하는 함수
async function chat(chatArr) {
  
  
  try {
    const prompt = system
  const concat = prompt.concat(Object.values(chatArr))
  console.log("concat", concat)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: concat,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}

module.exports = chat;
