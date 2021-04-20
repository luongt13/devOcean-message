const {Router} = require("express")
const { createMessage, getAllMessages, deleteMessage} = require("../controllers/messages.js")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/:id", getAllMessages)
router.post("/", createMessage)
router.post("/", restrict, createMessage)
// router.delete("/:id", deleteMessage)
router.delete("/:id", restrict, deleteMessage)

module.exports = router