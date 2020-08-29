import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
  `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  }
);

export default mongoose.connection;
