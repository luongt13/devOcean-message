const db = require('../db/connection')
const User = require("../models/user.js")
const Conversation = require("../models/conversation.js")
const Message = require("../models/message.js")
const faker = require("faker");

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  await User.deleteMany({});

  const users =
    [
      {
    name: faker.person.name(),
    email: faker.internet.email(),
    password_digest: faker.misc.password(length=12),

    imgURL: faker.internet.image_url(),
    city: faker.address.city(),
    state: faker.misc.state_abbr(),
    job: "Web Dev",
    languages: "Python, JS",
    professionalLink: "https://www.linkedin.com/",
    about: faker.lorem.paragraph(),
      }
      ]

    await User.insertMany(users)
    console.log("Created Users!")
}
const run = async () => {
    await main()
    db.close()
}

run()