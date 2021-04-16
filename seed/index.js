const db = require('../db/index')
const User = require("../models/user.js")
// const Conversation = require("../models/conversation.js")
// const Message = require("../models/message.js")
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
  console.log("Created Users!")
};
const run = async () => {
    await main()
    db.close()
}

run()