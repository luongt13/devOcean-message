const {Router} = require("express")
const {createMessage} = require("../controllers/messages.js")

const router = Router()

router.post("/", createMessage)
module.exports = router