const db = require("../db")
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

db.on("error", console.error.bind(console, "Mongo Connection Error:"));

const SALT_ROUNDS = 11
const TOKEN_KEY = "devoceanisthegreatestappever"

//creating a user
const signUp = async (req, res) => {
  try {
    const { name, email, password, job, imgURL, location, languages, professionalLink, about } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({ name, email, password_digest, job, imgURL, location, languages, professionalLink, about })
    // or const user= await User.create(req.body) and remove the save 
    
    await user.save()
    const payload = {
      name: user.name,
      email: user.email,
    }

    const token = jwt.sign(payload, TOKEN_KEY)

    return res.status(201).json({ token })
    
  } catch (error) {
    return res.status(400).json({ error: error.message})
  }
}
//user signing in
const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (user) {
      if (await bcrypt.compare(password, user.password_digest)) {
        const payload = {
          name: user.name,
          email: user.email,
        }
        const token = jwt.sign(payload, TOKEN_KEY)
        return res.status(200).json({ token, payload })
      } else {
          res.status(401).send("Invalid Credentials")
      }
    } else {
        res.status(400).send("User does not exist")
    }
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}
//verify user
const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, TOKEN_KEY)
    if (payload) {
      return res.json(payload)
    }
  } catch (error) {
      res.status(401).send("Not Authorized")
  }
}
//change password
const changePassword = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    const { newPassword, oldPassword } = req.body
    if (await bcrypt.compare(oldPassword, user.password_digest)) {
      const password_digest = bcrypt.hash(newPassword, SALT_ROUNDS)
      user = await User.findByIdAndUpdate(
        req.params.id,
        { password_digest: password_digest },
        { new: true }
      )
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      }
      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json({ user, token })
    } else {
      return res.status(400).send("Wrong password")
    }
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

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
          return res.status(404).send("Item with specified ID does not exist!");
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (updatedUser) {
      return res.status(200).json(updatedUser)
    } else {
      return res.status(404).send("User not updated!")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const findUser = async (req, res) => {
  try {
    const user = await User.findOne(req.body)
    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(404).send("User not found")
    }
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

module.exports = { signUp, signIn, verify, changePassword, getUsers, getUser, updateUser, findUser }