const db = require("../db");
const User = require("../models/user");

db.on("error", console.error.bind(console, "MongoDB connection error:"));


const createUser = async (req, res) => {
  try {
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
      const users = await User.find({});
      return res.status(200).json(users);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (user) {
          return res.status(200).json(user);
      } else {
          return res
              .status(404)
              .send("Item with specified ID does not exist!");
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getUser,
  getUsers,
  createUser
};