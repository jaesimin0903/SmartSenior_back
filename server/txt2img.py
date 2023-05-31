import torch
from diffusers import StableDiffusionPipeline
import sys

# print(sys.argv[1])
# print(torch.__version__)
# print(torch.cuda.is_available())

model_id = "stabilityai/stable-diffusion-2-1"
#model_id = "runwayml/stable-diffusion-v1-5"

pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

prompt = sys.argv[1]
image = pipe(prompt).images[0]
print(image)
image.save("../react-chatgpt/src/img/diffusion.png")


#