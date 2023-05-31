import os
import openai
import sys
import dotenv

dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)

job_arr = sys.argv[1]

job_info_arr = [{"role": "system", "content": "너는 일자리를 알려주는 봇이야"},
                {"role": "user","content":"예시질문 : 직종을 분류해서 5개의 카테고리로 (운송, 서비스, 제조, 복지, 기타) 나눠보여줘."     },
      {"role": "assistant","content":"예시대답 : 네, 알겠습니다. ### 운송 - [운전원](url) ### 서비스 - [조리사](url) ### 제조 - [직종](url) ### 복지 - [직종](url) ### 기타 - [직종](url)"     },
      {"role":"system","content":"한가지 직종에 해당하는 내용을 출력시에는 다음과 같은 예시로 대답. 예시대답 : ### 카테고리 - 직종 : (직종)  - 위치 : (위치) - 급여 : (급여) - 인원 : (인원) - 지원방법 - (지원방법) --------(가로줄넣기) "},      
      {"role": "system", "content": "일자리에 대한 모든 데이터 및 정보는 아래와 같다. 제공된 일자리 데이터만 이용해 대답한다."},
      ]

job_info_arr.append({"role":"system","content":job_arr})


def chatGPT(prompt):
  openai.api_key = os.environ["OPENAI_API_KEY"]
  try:
        job_info_arr.append({"role":"user","content":prompt})
      
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=job_info_arr,
        )

        print(completion.choices[0].message.content)
  except Exception as e:
        print("An error occurred:", e)
      
chatGPT(sys.argv[2])
#chatGPT("")