import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/corp.json", "utf-8");
    const corpUsers = JSON.parse(data);
    res
      .status(200)
      .json({ Message: "here are all the users in your corp", corpUsers });
  } catch (error) {
    res.status(400).json({ Message: "someting when erong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/corp.json", "utf-8");
    const corpUsers = JSON.parse(data);
    const { id, name, username, password, email } = req.body;
    const newEmplyoed = { id, name, username, password, email };
    corpUsers.push(newEmplyoed);
    const newjsonEmplyed = JSON.stringify(corpUsers);
    await fs.writeFile("./data/corp.json", newjsonEmplyed, "utf-8");
    return res.status(201).json({ Message: "created new user", newEmplyoed });
  } catch (error) {
    res.status(400).json({ Message: "look att your code dude " });
  }
});

export default router;
