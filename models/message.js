const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    content: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" }
  },
    { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
