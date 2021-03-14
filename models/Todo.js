import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide an Todo's name."],
         minLength: [5, "Todo's name has to have more than 4 characters."],
         nullable: false,
      },
      creatorId: {
         type: String,
         required: [true, "Todo has to have an creator's id."],
      },
   },
   { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;
