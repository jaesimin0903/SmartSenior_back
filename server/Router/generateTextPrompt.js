const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// 텍스트 입력을 받아 GPT-3로 처리하고 결과를 반환하는 함수
async function generateText(text_case) {
    text_content=""
    console.log("text_case is : ", text_case);
    switch (text_case) {
        case "hello":
            text_content = "다른사람에게 잘지내는지 묻는 글귀를 존댓말을 사용한 가벼운 격언느낌으로 생성해줘. 설명하지말고 ";
            break;
        case "love":
            text_content = "다른사람에게 사랑을 전하거나 고백하거나 사랑스러운 글귀를 존댓말을 사용해 20글자가 넘게 한 문장으로만 생성해줘. 설명하지말고 ";
            break;
        case "quotes":
            text_content = "명언을 하나 출력합니다.명언과 명언의 인물 사이에는 공백 한칸만 둡니다. 출력예시 : 삶이 있는 한 희망은 있다. 키케로";
            break;
        case "random":
            text_content = "듣기좋은 말 20글자가 넘는 한 문장 출력해줘";
            break;
        default:
            break;
        
    }
  try {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: text_content }
        ],
      });
    ;
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}



module.exports = generateText;

