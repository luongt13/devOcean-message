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
        let foundSender = await User.find({email: sender})
        //look for user receiver by email
        let foundReceiver = await User.find({email: receiver})

        //look in conversation for user id of person receiving it?  if id exists then push message to message//need to refactor as it needs to account for msg person has with other people...//maybe users in convo can be an array and it has to match for sender AND receiver 
        let foundConversation = await Conversation.find({ users: { $all: [foundReceiver._id, foundSender._id]}})

        // let foundConversation = await Conversation.find({ $or: [{userOneId: foundReceiver._id}, {userTwoId: foundReceiver._id}]})

        if (!foundConversation) {
              //if conversation is not found then create conversation
            let newConversation = await Conversation.create({user1Id: {foundSender, userId: foundReceiver, message: []}})

            //add conversation id to each user
            await User.findIdAndUpdate(
                {_id: foundSender[0]._id},
                {$push: {conversation: newConversation._id}})

            await User.findIdAndUpdate(
                {_id: foundReceiver[0]._id},
                {$push: {conversation: newConversation._id}})
            //push new message into conversation messages
            let msg = await Message.create(newMessage)
            await Conversation.findByIdAndUpdate(
                    {_id: foundConversation[0]._id},
                    {$push: {messages: msg._id}}
                )
        } else {
            //push new message into conversation messages
            let msg = await Message.create(newMessage)
            await Conversation.findByIdAndUpdate(
                    {_id: foundConversation[0]._id},
                    {$push: {messages: msg._id}}
            )
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

//get messages
//TEST
let body = {
    content: "hello",
    receiver: "user10",
    sender: "user20",
    id: "2"
}

let user = {
    name: "user10",
    conversation: ["123", "456"]
}

let user2 = {
    name: "user20",
    conversation: ["123", "456"]
}
let conversation = {
    user1: "user10",
    user2: "user20",
    messages: [{content: "goodbye", receiver:"user1", sender: "user2", id:"1"}],
    id: "456"
}
//create message
const testMessage = (body, conversation, user, user2) => {
        let {content, receiver, sender, id} = body
        let newMessage = {
            content,
            receiver,
            sender,
            id,
        }
        //look in conversation for matching receiver? (and sender??); that means they have a conversation
        Object.keys(conversation).forEach((item) => {
            if(conversation[item] === "user20") {
                console.log("exist")
            }
        })
        //if found then update conversation with message model
        conversation.messages.push(newMessage)
        console.log(body)
        console.log(conversation.messages)

        //if not found then create new conversation
        //await Conversation.create() >> reference message
        //await Message.create() 
        //push message to conversation messages array
        //find users and update their conversation array 
}

testMessage(body, conversation, user, user2)

module.exports = {createMessage}
