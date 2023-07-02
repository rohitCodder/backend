import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi02",
    })
    .then((c) => console.log(`Database connected with ${c.connection.host}`))
    .catch((e) => console.log("error"));
};
