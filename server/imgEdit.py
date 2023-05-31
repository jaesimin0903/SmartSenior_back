import numpy as np
from PIL import ImageFont, ImageDraw, Image
import cv2
import sys
import base64
from io import BytesIO

def calculate_average_color(image):
    # 이미지의 RGB값을 계산
    r, g, b = 0, 0, 0
    pixels = image.load()
    width, height = image.size
    for y in range(height):
        for x in range(width):
            _r, _g, _b = pixels[x, y]
            r += _r
            g += _g
            b += _b
    # 평균값을 계산
    num_pixels = width * height
    r //= num_pixels
    g //= num_pixels
    b //= num_pixels
    return b,g,r

def get_complementary_color(b,g,r):
    # 보색을 계산
    r, g, b = b,g,r
    return 255 - r, 255 - g, 255 - b

try:    
    image = cv2.imread(sys.argv[2], cv2.IMREAD_ANYCOLOR)
    overlay = image.copy()
except Exception as e:
    print("error", e)
#image = cv2.imread("C:/Users/Jaemin/Documents/javascript/react_ex/react-chatgpt/src/img/diffusion.png", cv2.IMREAD_ANYCOLOR)



imgForColor = Image.open(sys.argv[2])

avgB, avgG,avgR = calculate_average_color(imgForColor)
comB,comG,comR = get_complementary_color(avgB,avgG,avgR)
b,g,r= 0,0,0

if((avgB+avgG+avgR)/3 >=128):
    b,g,r = 0,0,0
else:
    b,g,r = 255,255,255



font_size = 80
h,w,c = image.shape

line_w = w/font_size

height = str(h)

test_str = sys.argv[1]
#test_str = "근하신년 오늘 하루도 행복하세요"

max_line = (int)(len(test_str)/line_w)+1

str_slice = test_str.split(" ")
exp_str = []
str_token = ""

font = ImageFont.truetype("arial.ttf", font_size)

i = 0
while i != len(str_slice):
    if len(str_token) + len(str_slice[i]) + 1 <= line_w:
        str_token += " " + str_slice[i]
        i += 1
    else:
        exp_str.append(str_token.strip())  # str_token의 앞뒤 공백 제거 후 추가
        str_token = ""  # str_token 초기화
    if i == len(str_slice) and str_token:  # 마지막 요소이고, str_token이 빈 문자열이 아닌 경우
        exp_str.append(str_token.strip()) 

background_h = []

center_w = []
for i in range(len(exp_str)):
    left,top,right,bottom = font.getbbox(exp_str[i])
    center_w.append(right)

for i in range (len(exp_str)):
    background_h.append((int)((h/2) + (i - len(exp_str)/2) * font_size))

cv2.rectangle(overlay, (0, background_h[0]), (w, background_h[len(exp_str)-1]+font_size), (comB, comG, comR), -1)
alpha = 0.7  # 투명도 설정 (0은 완전 투명, 1은 완전 불투명)
image = cv2.addWeighted(overlay, alpha, image, 1 - alpha, 0)

img = np.zeros((200,400,3),np.uint8)
#b,g,r,a = 0,0,0,0
fontpath = "fonts/batang.ttc"
font = ImageFont.truetype(fontpath, font_size)
img_pil = Image.fromarray(image)
draw = ImageDraw.Draw(img_pil)

for i in range (len(exp_str)):
    #ex = (int)((font_size)*((int)(w/font_size/2) -(len(exp_str[i])/2)))
    ex = (int)((w-center_w[i])/2)-50
    
    draw.text((ex,(int)((h/2) + (i - len(exp_str)/2) * font_size)), exp_str[i],font=font,fill=(b,g,r))
    


img = np.array(img_pil)

#cv2.imshow('Image',img)

# 임의의 행렬을 생성
matrix = np.array([...])  # 여기에 실제 행렬을 입력

# 행렬을 이미지로 변환
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
resultImg = Image.fromarray(img)

#resultImg = Image.fromarray(img)

# 이미지를 base64 문자열로 변환
buffered = BytesIO()
resultImg.save(buffered, format="JPEG")
img_str = base64.b64encode(buffered.getvalue())

print(str(img_str))

#cv2.imwrite("../react-chatgpt/src/img/diffusion.png",img)
cv2.waitKey()
cv2.destroyAllWindows()



#print(img)