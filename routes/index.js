const {Router} = require("express")
const userRouter = require("./users.js")
const conversationRouter = require("./conversation.js")
const messageRouter = require("./messages.js")

const router = Router()

router.use("/users", userRouter)
router.use("/messages", messageRouter)
router.use("/conversations", conversationRouter)


module.exports = router