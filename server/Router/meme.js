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
      "- 요즘 한국 유행어에 대해 5가지 알려줘.  - 유행어 만 출력해줘 - 각 유행어의 끝에 \n 를 넣어 문장을 구분한다.",
  },
  {
    role: "system",
    content:
      "출력 예시 : 알잘딱깔센, 귀요미, 킹받네, 킹받드라슈, 도믿남",
  },
];

// 텍스트 입력을 받아 GPT-3로 처리하고 결과를 반환하는 함수
async function meme(chatArr) {
  try {
    const prompt = system;
    const concat = prompt.concat(Object.values(chatArr));
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: concat,
    });
    const memes = response.data.choices[0].message.content.split(',')
    const KORmemes = memes.map(string => string.replace(/[^\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g, '').trim())
    console.log(memes, KORmemes)
    return KORmemes;
  } catch (error) {
    console.error(error);
  }
}

module.exports = meme;
