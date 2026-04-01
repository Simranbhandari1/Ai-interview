const mongoose = require('mongoose');

/**
 * -job description schema : String
 * -resume text : String
 * -Self description  : String
 * -matchScore:{
 * }
 * -Technical questions: 
 * [{
 * question: "",
 * intention: "",
 * answer: "",
 * }]
 * 
 * behavioral questions: [{
 * question: "",
 * intention: "",
 * answer: "",
 * }]
 * Skill gaps :[{
 * skill: "",
 * severity: ""
 * }]
 * -Preparation Plan: [{
 * day: Number,
 * focus:String,
 * tasks:[String]
 * }]
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] }
},{
    _id: false,
});
const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: [true, "Job Description is required"] },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,

    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: {

    }
})
