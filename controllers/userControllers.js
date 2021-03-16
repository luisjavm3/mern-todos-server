import mongoose from 'mongoose';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const { Types } = mongoose;

export const getAllUsersController = async (req, res, next) => {
   try {
      const users = await User.find().select('role _id username');
      const messageResponse = { success: true, content: users };

      res.status(200).json(messageResponse);
   } catch (error) {
      next(error);
   }
};

export const deleteUser = async (req, res, next) => {
   //    res.status(200).send('This route works! Only admis can see this.');
   const { userId } = req.params;

   if (!Types.ObjectId.isValid(userId))
      return next(new ErrorResponse("The User's Id is not valid.", 400));

   try {
      const deletedUser = await User.findByIdAndDelete(userId);
      const messageResponse = { success: true, content: deletedUser };

      res.status(200).json(messageResponse);
   } catch (error) {
      next(error);
   }

   //    res.status(200).send(userId);
};
