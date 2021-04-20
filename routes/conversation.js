const {Router} = require("express")
const {getAllConversations} = require("../controllers/conversations.js")
const restrict = require("../helpers/restrict.js")

const router = Router()

router.get("/:id", getAllConversations)

module.exports = router