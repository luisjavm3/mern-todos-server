import User from '../models/User.js';

export const signupController = async (req, res, next) => {
   const user = req.body;

   try {
      const newUser = await User.create(user);

      const token = newUser.generateToken();

      res.status(200).json({ success: true, token });
      //   sendToken(res, token);
   } catch (error) {
      next(error);
   }
};

// const sendToken = (res, user) => {
//    res.status(200).json({ success: true, token });
// };
