import express from "express";
const router = express.Router();
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Hämta alla användare
 *     responses:
 *       200:
 *         description: En lista med användare
 */

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Skapa en ny användare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Användare skapad
 */
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res
      .status(201)
      .json({ Message: "user was created ", savedUser, success: true });
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
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Ta bort en användare
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Användare borttagen
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted", success: true });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID", error: err });
  }
});

export default router;
