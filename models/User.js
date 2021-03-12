import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, 'Please provide an username.'],
         unique: [true, 'This username already exists.'],
         minLength: [4, 'The username must has more than 3 characters.'],
      },
   },
   { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
