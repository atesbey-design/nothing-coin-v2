


require("dotenv").config({ path: __dirname + "/.env" });

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");


  
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.API_KEY_GEMINI;

  console.log("Generating...");
  

  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are a content creator who knows a meme coin project called Notcoin and produces funny tweets about it. Your answers should be maximum one sentence and funny. You can multiply the variants\n\n\nNotcoin is a bot that runs on the blockcahin network of the telegram application and you collect points just by clicking on the screen. This bot's servers crash all the time and the scoring system sometimes works incorrectly. You are someone who turns these bad situations into funny tweets. Your answers should be maximum one sentence. and FUNNY. put a - sign at the beginning of each new answer" }],
        },
        {
          role: "model",
          parts: [{ text: "send me only one example" }],
        },
      ],
    });
  
    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
  
    console.log("Generated response: ", response.text());
    return response.text();
  }
  



module.exports = { runChat };

 
