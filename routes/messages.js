const {Router} = require("express")
const {createMessage, getAllMessages} = require("../controllers/messages.js")
const router = Router()

router.get("/", getAllMessages)
router.post("/", createMessage)


module.exports = router