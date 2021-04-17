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
            console.log(newConversation)
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
            return res.status(201).json(msg)
        } else {
            //push new message into conversation messages
            let msg = await Message.create(newMessage)
            console.log(msg)
            await Conversation.findByIdAndUpdate(
                {_id: foundConversation[0]._id},
                {$push: {messages: msg._id}},
                {new: true}
            )
            return res.status(201).json(msg)

        }
        } catch (err) {
            return res.status(500).json({error: err.message})
        }
    }

//get messages
const getAllMessages = async (req,res) => {
    try {
        //get based on the params id of the receiver (person they are sending message to)//conversation id???? find by your id and receiver id? 
        let {receiver, sender} = req.body

        // let foundReceiver = await User.findById(req.params.id)
        let foundReceiver = await User.findById(receiver)
        // let foundSender = await User.findById()
        let foundSender = await User.findById(sender)

        //find convo - where messages are stored 
        let foundConversation = await Conversation.find({ users: { $all: [foundReceiver._id, foundSender._id]}}).populate("messages")

        //return conversation...message
        return res.status(200).json(foundConversation)
        } catch (err) {
            return res.status(500).json({error: err.message})
        }
    }

module.exports = {createMessage, getAllMessages}
