// const db = require("../db")
// const User = require("../models/user.js")
// const Message = require("../models/message.js")
// const Conversation = require("../models/conversation.js")

// db.on("error", console.error.bind(console, "connection error"))

// //create message
// const createMessage = async (req,res) => {
//     try {
//         //de-structure the request body
//         let {content, receiver, sender} = req.body
//         //set up the nre message object
//         let newMessage = {
//             content,
//             receiver,
//             sender,
//         }
//          //look in conversation for user id?  if id exists then push message to message
//         //look for user sender by username/email
//         let foundSender = await User.find({username: sender})
//         //look for user receiver by username/email
//         let foundReceiver = await User.find({username: receiver})
//         //look for conversation id with user receiver matching user2?
//         foundReceiver.conversation.map((converse) => {
//             await Conversation.findById(foundReceiver)
//         })
//     } catch (err) {
//         return res.status(500).json({error: err.message})
//     }
// }
// //get messages


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
const createMessage = (body, conversation, user, user2) => {
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

createMessage(body, conversation, user, user2)


