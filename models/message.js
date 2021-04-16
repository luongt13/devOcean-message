const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageModel = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    //or sender is string of email
    receiver: { type: Schema.Types.ObjectId, ref: "User" }
    //or receiver is string of email 
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageModel);
