const { getUser, getUsers, signUp, updateUser } = require("../controllers/users.js")
const { Router } = require("express")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", signUp)
router.put("/:id", restrict, updateUser)

module.exports = router