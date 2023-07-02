import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/database.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cors from "cors";
const app = express();
dotenv.config({
  path: "./database/config.env",
});
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});

app.use(errorMiddleware);
