import express from 'express';

import {
   signinController,
   signupController,
} from '../controllers/authControllers.js';

const authRoutes = express.Router();

authRoutes.route('/signup').post(signupController);
authRoutes.route('/signin').post(signinController);

export default authRoutes;
