//auth vale sare routes yaha banenge
const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//JSDoc comment for route documentation
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register', authController.registerUserController)
/**
 * @route POST /api/auth/login
 * @description Login an existing user with username and password, returns a JWT token if successful
 * @access Public
 */
authRouter.post('/login', authController.loginUserController)
/**
 * @route GET /api/auth/logout
 * @description clear token from cookie and add teh token in blacklist
 * @access Public
 */

authRouter.get('/logout', authController.logoutUserController)  
/**
 * @route Get/api/auth/get-me
 * @description get the current logged  in user details 
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser, authController.getMeController)
module.exports=authRouter