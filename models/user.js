const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
      //needed for auth 
    name: { type: String, required: true },
    email: { type: String, required: true },
    password_digest: { type: String, required: true },
    //remainder of profile
    imgURL: { type: String, required: true },
    location: { type: String, required: true },
    job: { type: String, required: true },
    languages: { type: String, required: true },
    professionalLink: { type: String, required: true },
    about: { type: String, required: true },
    //references conversation model
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);