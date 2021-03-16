import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, 'Please provide an username.'],
         unique: [true, 'This username already exists.'],
         minLength: [4, 'The username has to have more than 3 characters.'],
         maxLength: [15, 'The username has to have less than 10 characters.'],
      },
      role: {
         type: String,
         enum: ['user', 'admin', 'super'],
         default: 'user',
      },
      password: {
         type: String,
         required: [true, 'Please provide a password.'],
         minLength: [6, 'The password has to have more than 5 characters.'],
      },
   },
   { timestamps: true }
);

UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      return next();
   }

   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
   const SECRET_KEY = process.env.SECRET_KEY;
   const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
   const payload = { id: this._id };

   return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRATION_TIME });
};

UserSchema.methods.isMatchPassword = function (password) {
   return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
