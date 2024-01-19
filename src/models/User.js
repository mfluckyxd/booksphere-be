const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    default: 'user',
  },
  book: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
}, {versionKey: false, timestamps: true});

const User = mongoose.model("users", userSchema);

module.exports = User;