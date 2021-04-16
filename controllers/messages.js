const db = require("../db")
const User = require("../models/user.js")
const Message = require("../models/message.js")
const Conversation = require("../models/conversation.js")

db.on("error", console.error.bind(console, "connection error"))

//create message
const createMessage = async (req,res) => {
    try {
        //de-structure the request body
        let {content, receiver, sender} = req.body
        //set up the nre message object
        let newMessage = {
            content,
            receiver,
            sender,
        }
        //look for user sender by username/email
        let foundSender = await User.find({username: sender})
        //look for user receiver by username/email
        let foundReceiver = await User.find({username: receiver})
        //look for conversation id with user receiver matching user2?
        foundReceiver.conversation.map((converse) => {
            await Conversation.findById(foundReceiver)
            console.log(converse)
        })
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
//get messages