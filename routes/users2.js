const { getUser, getUsers, createUser } = require("../controllers/users2")
const { Router } = require("express")

const router = Router()


router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)


module.exports = router