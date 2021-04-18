//dj add your routes here 
const { getUser, getUsers } = require("../controllers/users")
const { Router } = require("express")

const router = Router()


//and here 

router.get("/:id", getUser)
router.post("/", createUser)


module.exports = router