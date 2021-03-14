import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const authUser = async (req, res, next) => {
   let token;
   const { authorization } = req.headers;
   const SECRET_KEY = process.env.SECRET_KEY;

   if (!authorization || !authorization.startsWith('Bearer'))
      return next(
         new ErrorResponse('Please provide a authorization mean.', 400)
      );

   token = authorization.split(' ')[1];

   if (!token)
      return next(new ErrorResponse('Please provide a valid token.', 400));

   try {
      //                            ↓↓↓ This retrieve the token's payload
      const { id: userId } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(userId).exec();

      //    ↓ Maybe this has no sense
      if (!user) return next(new ErrorResponse('User not found.', 400));

      req.user = user;
      next();
   } catch (error) {
      next(error);
   }
};

export default authUser;
