const db = require('../db/index')
const User = require("../models/user.js")
const Conversation = require("../models/conversation.js")
const Message = require("../models/message.js")
const faker = require("faker");


db.on('error', console.error.bind(console, 'MongoDB connection error:'))



const main = async () => {



  await User.deleteMany({});

  let users = [];
  for (let i = 0; i < 10; i++) {
    let user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password_digest: "sally123",
      // imgURL: faker.internet.image_url(),
      imgURL: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", 
      // city: faker.address.city(),
      // state: faker.misc.state_abbr(),
      location: "New York, NY",
      job: "Web Dev",
      languages: "Python, JS",
      professionalLink: "https://www.linkedin.com/",
      about: faker.lorem.paragraph(),
    };
    users.push(user)
  }
  await User.insertMany(users)
  // console.log("Created Users!")

//   await Message.deleteMany({});

//   let createdUser = await User.find({})
//   console.log(createdUser);

//   let messages = []
// for (let i = 0; i < 10; i++) {
//   let message = {
//     content: faker.lorem.sentence(),
//     sender: createdUser[0]._id,
//     receiver: createdUser[1]._id

//   };
//   messages.push(message)
// }
// await Message.insertMany(messages)
//   console.log("Created Messages!")


  
//   await Conversation.deleteMany({});
//   let createdMessages = await Message.find({})
//   // console.log(createdMessage);

//   let conversations = [];
//   for (let i = 0; i < 10; i++) {
//     let conversation = {
//     userOneId: createdUser[0]._id,
//     userTwoId:createdUser[1]._id,
//     messages: createdMessages
//     };
//     conversations.push(conversation)
//   }
//   await Conversation.insertMany(conversations)
//   // console.log("Created Users!")

};


const run = async () => {
    await main()
    db.close()
}

run()