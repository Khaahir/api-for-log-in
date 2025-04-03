import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import corpRouter from "./routes/corpUsers.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
import cors from "cors";
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on("error", (err) => {
  console.log(err);
});

database.once("connected", () => {
  console.log("Connected to Database");
});
app.use("/api/users", userRouter);
app.use("/api/corpUsers", corpRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});

export default database;
