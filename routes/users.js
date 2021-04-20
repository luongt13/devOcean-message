const { getUser, getUsers, signUp, updateUser, signIn, verify, findUser } = require("../controllers/users.js")
const { Router } = require("express")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/users", getUsers)
router.get("/user", findUser)

router.get("/users/:id", getUser)
router.post("/sign-up", signUp)
router.put("/users/:id", restrict, updateUser)
router.get("/verify", verify)
router.post("/sign-in", signIn)

module.exports = router