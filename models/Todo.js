import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TodoSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide an Todo's name."],
         minLength: [5, "Todo's name has to have more than 4 characters."],
         nullable: false,
      },
      creatorId: {
         type: Schema.Types.ObjectId,
         required: [true, "Todo has to have an creator's id."],
      },
   },
   { timestamps: true }
);

const Todo = model('Todo', TodoSchema);
export default Todo;
