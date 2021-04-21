const db = require("../db")
const User = require("../models/user.js")
const Message = require("../models/message.js")
const Conversation = require("../models/conversation.js")

db.on("error", console.error.bind(console, "connection error"))
//get all conversations based on the user logged in? 
const getAllConversations = async (req,res) => {
    try {
         let user = await User.findById(req.params.id).populate({
            path: "conversations",
            populate: [{
                path: "messages",
                model: "Message"
            },
            {
                path: "users",
                model: "User"
            }
        ]   
        })
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getAllConversations}