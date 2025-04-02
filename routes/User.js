import express from "express";
const router = express.Router();
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf-8");
    const users = JSON.parse(data);
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf-8");
    const users = JSON.parse(data);
    const { id, name, email, isAdmin, password } = req.body;
    const newUser = { id, name, email, isAdmin, password };
    users.push(newUser);
    const JsonUsers = JSON.stringify(users);
    await fs.writeFile("./data/users.json", JsonUsers, "utf-8");

    res.status(201).json({ Message: "user was created ", success: true });
  } catch (err) {
    res.status(400).json({ Message: " Something went wrong", err });
  }
});
router.put("/:id", async (req, res) => {
  const data = await fs.readFile("./data/users.json", "utf-8");
  const users = JSON.parse(data);
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res
      .status(400)
      .json({ Message: "there is no user with that id", success: false });
  }
  users[index] = { id, ...req.body };
  await fs.writeFile("./data/users.json", JSON.stringify(users), "utf-8");
  res.status(200).json({ Message: "updated user", users: users[index] });
});
router.delete("/:id", async (req, res) => {
  const data = await fs.readFile("./data/users.json", "utf-8");
  const users = JSON.parse(data);
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(400).json({ Message: "could not find any user" });
  }

  users.splice(index, 1);

  await fs.writeFile("./data/users.json", JSON.stringify(users), "utf-8");

  res.status(200).json({ Message: "user was deleted", success: true });
});

export default router;
