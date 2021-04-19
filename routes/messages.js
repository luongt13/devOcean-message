const {Router} = require("express")
const { createMessage, getAllMessages, deleteMessage, findUser} = require("../controllers/messages.js")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/:id", getAllMessages)
router.post("/", createMessage)
// router.post("/", restrict, createMessage)

router.delete("/:id", restrict, deleteMessage)

router.get("/", findUser)

module.exports = router