import express from "express";
import userRouter from "./routes/User.js";
import corpRouter from "./routes/corpUsers.js";

const app = express();

app.use(express.json());
import cors from "cors";

app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/corpUsers", corpRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
