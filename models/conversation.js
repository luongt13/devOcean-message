const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationModel = new Schema(
  {
    userOneId: { type: Schema.Types.ObjectId, ref: "User" },
    userTwoId: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationModel);
