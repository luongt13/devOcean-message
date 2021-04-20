<<<<<<< HEAD
const { getUser, getUsers, createUser } = require("../controllers/users")
const { Router } = require("express")

const router = Router()


router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.post("/users/", createUser)

=======
const { getUser, getUsers, signUp, updateUser } = require("../controllers/users.js")
const { Router } = require("express")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", signUp)
router.put("/:id", restrict, updateUser)
>>>>>>> 20f4307f45d5b7ba0f47922d1f26341ce76fa863

module.exports = router