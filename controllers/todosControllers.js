import Todo from '../models/Todo.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { USER } from '../config/roles.js';
import mongoose from 'mongoose';

export const getAllTodosController = async (req, res, next) => {
   let todos;
   const { user } = req;

   try {
      if (user.role === USER) {
         todos = await Todo.find({ creatorId: user._id });
      } else {
         todos = await Todo.find();
      }

      res.status(200).json(todos);
   } catch (error) {
      next(error);
   }
};

export const createTodoController = async (req, res, next) => {
   const { name } = req.body;
   const { user } = req;

   if (!name)
      return next(new ErrorResponse("Please provide an Todo's name.", 400));

   try {
      const newTodo = await Todo.create({ name, creatorId: user.id });

      res.status(200).json(newTodo);
   } catch (error) {
      next(error);
   }
};

export const updateTodoController = async (req, res, next) => {
   const { todoId } = req.params;
   const { name } = req.body;

   if (!name)
      return next(new ErrorResponse('Please provide a name to modify.', 400));

   if (!mongoose.Types.ObjectId.isValid(todoId))
      return next(new ErrorResponse(`ID: ${todoId} incorrect.`, 400));

   try {
      const updatedTodo = await Todo.findByIdAndUpdate(
         todoId,
         { name },
         { new: true }
      );

      res.status(200).json(updatedTodo);
   } catch (error) {
      next(error);
   }
};
