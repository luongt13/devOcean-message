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
        console.log(req.body)
        //look for user sender by email
        let foundSender = await User.findById(sender)
        //look for user receiver by email
        let foundReceiver = await User.findById(receiver)
        //// an array and it has to match for sender AND receiver 
        let foundConversation = await Conversation.find({ users: { $all: [foundReceiver._id, foundSender._id]}})
        console.log(foundConversation)
        if (foundConversation.length === 0) {
              //if conversation is not found then create conversation
            let newConversation = await Conversation.create({users: [foundSender, foundReceiver], message: []})
            //add conversation id to each user
            await User.findByIdAndUpdate(
                {_id: foundSender._id},
                {$push: {conversations: newConversation._id}})

            await User.findByIdAndUpdate(
                {_id: foundReceiver._id},
                {$push: {conversations: newConversation._id}})
            //push new message into conversation messages
            let msg = await Message.create(newMessage)
            await Conversation.findByIdAndUpdate(
                {_id: newConversation._id},
                {$push: {messages: msg._id}}
                )
            return res.status(201).json(newConversation)
        } else {
            //push new message into conversation messages
            let msg = await Message.create(newMessage)
            await Conversation.findByIdAndUpdate(
                {_id: foundConversation[0]._id},
                {$push: {messages: msg._id}},
                {new: true}
            )
            return res.status(201).json(foundConversation)
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
//get thread
const getAllMessages = async (req,res) => {
    try {
        let user = await Conversation.findById(req.params.id).populate({
            path: "messages",
            model: "Message",
              populate: [{
                path: "sender",
                model: "User",
            }, {
                path: "receiver",
                model: "User"
            }]
        }).populate("users")
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}
//delete message
const deleteMessage = async (req, res) => {
    try {
        let deletedMessage = await Message.findByIdAndDelete(req.params.id)
        let foundConversation = await Conversation.findOne({messages: {$in: [{_id: deletedMessage._id}]}})
        await foundConversation.messages.pull({_id: deletedMessage._id})
        await foundConversation.save()

        if (deletedMessage) {
            return res.status(200).json(foundConversation)
        } else {
            return res.status(404).send("Message not found")
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createMessage, getAllMessages, deleteMessage}