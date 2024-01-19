const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    bookUrl:{
        type: String
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
},{versionKey: false, timestamps: true});

const Book = mongoose.model("books",bookSchema);

module.exports = Book;