const { GoogleGenAI } = require('@google/generative-ai');
const {z} = require('zod');
const ZodToJsonSchema = require('zod-to-json-schema');
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
    
});

async function invokeGeminiAi(resume, selfDescription, jobDescription) {
    const response = await ai.generateContent({
        model: 'gemini-2.5-flash',
       contents: "hello world",
    });
    console.log(response.text); 
}

module.exports = invokeGeminiAi