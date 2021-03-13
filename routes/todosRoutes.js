import express from 'express';
import authUser from '../middlewares/authUser.js';
import {
   createTodoController,
   getAllTodosController,
} from '../controllers/todosControllers.js';

const todosRoutes = express.Router();

todosRoutes.route('/').get(authUser, getAllTodosController);
todosRoutes.route('/').post(authUser, createTodoController);

export default todosRoutes;
