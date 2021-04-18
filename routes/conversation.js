const {Router} = require("express")
const {getAllConversations} = require("../controllers/conversations.js")
const router = Router()

router.get("/:id", getAllConversations)


module.exports = router