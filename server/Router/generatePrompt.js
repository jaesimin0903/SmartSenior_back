const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// 텍스트 입력을 받아 GPT-3로 처리하고 결과를 반환하는 함수
async function generateText() {
  try {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "The sight of flowers blooming in bright, warm weather. The colorful petals swaying in the wind create a beautiful sight and can fill your heart with warm emotions. 이런느낌의 문장 하나 출력해줘 문장만" }
        ],
      });
    ;
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}


module.exports = generateText;

