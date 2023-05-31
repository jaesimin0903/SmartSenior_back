import requests

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
headers = {"Authorization": f"Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content
image_bytes = query({
	"inputs": "Astronaut riding a horse",
})
# You can access the image with PIL.Image for example

query(1)
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))