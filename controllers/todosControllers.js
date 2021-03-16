import Todo from '../models/Todo.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { USER } from '../config/roles.js';
import mongoose from 'mongoose';

const { Types } = mongoose;

export const getAllTodosController = async (req, res, next) => {
   let todos;
   const { user } = req;

   try {
      if (user.role === USER) {
         const findTodosWithUserCreatorPipeline = [
            {
               $match: {
                  creatorId: user._id,
               },
            },
            {
               $lookup: {
                  from: 'users',
                  localField: 'creatorId',
                  foreignField: '_id',
                  as: 'user',
               },
            },
            {
               $unwind: {
                  path: '$user',
               },
            },
         ];

         todos = await Todo.aggregate(findTodosWithUserCreatorPipeline);
      } else {
         const findAllTodosWithUserCreatorPipeline = [
            {
               $lookup: {
                  from: 'users',
                  localField: 'creatorId',
                  foreignField: '_id',
                  as: 'user',
               },
            },
            {
               $unwind: {
                  path: '$user',
               },
            },
         ];

         todos = await Todo.find();
      }

      const messageResponse = { success: true, content: todos };
      res.status(200).json(messageResponse);
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
      const messageResponse = { success: true, content: newTodo };

      res.status(200).json(messageResponse);
   } catch (error) {
      next(error);
   }
};

export const updateTodoController = async (req, res, next) => {
   const { todoId } = req.params;
   const { name, creatorId } = req.body;
   const { user } = req;

   if (!name || !creatorId)
      return next(
         new ErrorResponse('Please provide a name and creatorId.', 400)
      );

   if (!Types.ObjectId.isValid(todoId))
      return next(new ErrorResponse(`ID: ${todoId} incorrect.`, 400));

   if (!Types.ObjectId.isValid(creatorId))
      return next(new ErrorResponse(`creatorId ${creatorId} incorrect.`, 400));

   if (user.role === USER && creatorId !== user._id)
      return next(
         new ErrorResponse(
            "The Todo you tried modify doesn't belong to you.",
            403
         )
      );

   try {
      const updatedTodo = await Todo.findByIdAndUpdate(
         todoId,
         { name },
         { new: true }
      );

      const messageResponse = { success: true, content: updatedTodo };

      res.status(200).json(messageResponse);
   } catch (error) {
      next(error);
   }
};

export const deleteTodoController = async (req, res, next) => {
   // res.status(200).send('This route works.');
   const { todoId } = req.params;
   const { user } = req;
   // res.status(200).send(user);

   if (!Types.ObjectId.isValid(todoId))
      return next(new ErrorResponse("Invalid Todo's id", 400));

   try {
      let todo = await Todo.findById(todoId);

      if (user.role === USER && String(todo.creatorId) !== String(user._id)) {
         console.log('Entra');
         return next(
            new ErrorResponse('Cannot delete an Todo of another user', 400)
         );
      }

      todo = await Todo.findByIdAndDelete(todoId);

      const messageResponse = { success: true, content: todo };

      res.status(200).json(messageResponse);
   } catch (error) {
      next(error);
   }
};
