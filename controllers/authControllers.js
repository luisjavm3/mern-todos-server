import User from '../models/User.js';
// import bcrypt from 'bcrypt';

import ErrorResponse from '../utils/ErrorResponse.js';

export const signupController = async (req, res, next) => {
   const user = req.body;

   try {
      const newUser = await User.create(user);

      const token = newUser.generateToken();

      res.status(200).json({ success: true, token });
   } catch (error) {
      next(error);
   }
};

export const signinController = async (req, res, next) => {
   const { username, password } = req.body;

   if (!username || !password)
      return next(
         new ErrorResponse('Please provide both username and password.', 400)
      );

   try {
      const user = await User.findOne({ username }, 'password');

      if (!user)
         // ↓↓↓   this might reveals essential information
         return next(new ErrorResponse('This user does not exits.', 404));

      if (!user.isMatchPassword(password))
         return next(new ErrorResponse('Wrong credentials', 400));

      const token = user.generateToken();

      res.status(200).json({ success: true, token });
   } catch (error) {
      next(error);
   }
};
