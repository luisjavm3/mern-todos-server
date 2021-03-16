import express from 'express';
import { ADMIN, USER } from '../config/roles.js';
import {
   deleteUser,
   getAllUsersController,
} from '../controllers/userControllers.js';
import authRole from '../middlewares/authRole.js';
import authUser from '../middlewares/authUser.js';

const userRoutes = express.Router();

userRoutes.route('/').get(authUser, authRole(ADMIN), getAllUsersController);
userRoutes.route('/:userId').delete(authUser, authRole(ADMIN), deleteUser);

export default userRoutes;
