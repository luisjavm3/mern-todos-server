import express from 'express';
import authUser from '../middlewares/authUser.js';
import {
   createTodoController,
   getAllTodosController,
   updateTodoController,
} from '../controllers/todosControllers.js';

const todosRoutes = express.Router();

todosRoutes.route('/').get(authUser, getAllTodosController);
todosRoutes.route('/').post(authUser, createTodoController);
todosRoutes.route('/:todoId').put(authUser, updateTodoController);

export default todosRoutes;
