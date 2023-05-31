const fetch = require("node-fetch");
const fs =require('fs');
const Buffer =require('buffer');

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    fs.writeFileSync('output.jpg', new Buffer(result));
    return result;
}
query({"inputs": "Astronaut riding a horse"}).then((response) => {
    console.log(response)
});
