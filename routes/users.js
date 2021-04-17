const { getUser, getUsers, createUser } = require("../controllers/users")
const { Router } = require("express")

const router = Router()


router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.post("/users/", createUser)


module.exports = router