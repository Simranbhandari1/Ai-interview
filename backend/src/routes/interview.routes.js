const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');
//step -1

/**
 * @route Post/api/interview/
 * @description generate interview report based on resume pdf, self description and job description
 * @access private
 */

interviewRouter.post(
  '/',
  authMiddleware.authUser,
  upload.single('resume'),
  interviewController.generateInterviewReportController,
);
module.exports = interviewRouter;
