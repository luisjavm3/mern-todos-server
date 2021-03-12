import mongoose from 'mongoose';

const dbConnection = () => {
   const URI = process.env.MONGO_URI;

   mongoose.connect(
      URI,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => {
         if (err) return console.log('Database not connected.'.bgRed.black);
         console.log('Database connected'.bgGreen.black);
      }
   );
};

export default dbConnection;
