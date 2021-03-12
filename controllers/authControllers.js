import User from '../models/User.js';

export const signupController = async (req, res, next) => {
   const user = req.body;

   try {
      const savedUser = await User.create(user);

      res.status(200).json(savedUser);
   } catch (error) {
      res.status(500).json(error);
   }
};
