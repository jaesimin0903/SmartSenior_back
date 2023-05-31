const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 텍스트 입력을 받아 GPT-3로 처리하고 결과를 반환하는 함수
async function generateText(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-personal-2023-04-30-16-39-59",
      prompt: prompt,
      max_tokens: 1000, // 최대 토큰 수 설정
      n: 1,
      stop: '.[END]',
      temperature: 1,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

module.exports = generateText;

