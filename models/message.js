const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageModel = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: [{ type: Schema.Types.ObjectId, ref: "User" }]

    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageModel);
