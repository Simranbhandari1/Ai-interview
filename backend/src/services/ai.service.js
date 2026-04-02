const {GoogleGenAI} = require('@google/genai');
const {z} = require('zod');
const {zodJsonSchema} = require('zod-to-json-schema');
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
}); 
const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({ 
        question: z.string().description("The technical question can be asked in the interview"),
        intention: z.string().description("The intention of interviewer behind asking the technical question"),
        answer: z.string().description("How to answer this question , what points to cover ,what approach to take while answering this question")

    })),
    
})
 async function generateInterviewReport({resumeText, selfDescription ,jobDescription}){
    
 }

async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Hello gemini ! explain what is interview?",
    })
    console.log(response.text);

}
module.exports = invokeGeminiAi;