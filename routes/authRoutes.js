import express from 'express';

import { signupController } from '../controllers/authControllers.js';

const authRoutes = express.Router();

authRoutes.route('/signup').post(signupController);

export default authRoutes;
