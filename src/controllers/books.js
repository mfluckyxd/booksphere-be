const Book = require("../models/Book");
const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const { generateToken } = require("../utils/token");

const createBook = async (req,res)=>{
    const {title, author,description,image,bookUrl } = req.body;
    const creator = req.userId;
    console.log(title,author,description)
    if(title&&author&&description){
        const bookInfo = {
            title,
            author,
            description,
            image,
            bookUrl,
            creator:creator,
        }
        try{
            const newBook = await Book.create(bookInfo)
            await User.findByIdAndUpdate(req.userId, { $push: { book: newBook._id } });
            res.status(201).json({
                status: "success",
                message: "Book created successfully",
                data: newBook,
              });
        }catch(err){
            res.status(500).json({ status: "failed", error: err.message });
        }
    }else{
        res.status(400).json({
            status: "failed",
            message: "Incomplete Data.",
          });
    }
}
const getBooks = async (req,res)=>{
    const { new: isNew, old } = req.query;
    const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

    try {
        if(Object.keys(req.query).length === 0){
            const allBooks = await Book.find();
            res.status(200).json({ status: "success", data: allBooks });
        }else if(isNew=="1"){
            const recentBooks = await Book.find({ createdAt: { $gte: tenMinutesAgo } });
            return res.status(200).json({ status: 'success', books: recentBooks });
        }else if(old=="1"){
            const oldBooks = await Book.find({ createdAt: { $lt: tenMinutesAgo } });
            return res.status(200).json({ status: 'success', books: oldBooks });
        }else{
            return res.status(400).json({ status: 'fail', error: 'Unexpected query parameters' });
        }
        
    } catch (error) {
        res.status(500).json({ status: "failed", error: error.message });
    }
}

const deleteBook = async(req,res)=>{
    const {userId} = req;
    const { bookId }= req.params;
    try{
        const book = await Book.findById(bookId);
        const isOwner = book.creator.equals(userId);
        if(isOwner){
            await Book.findByIdAndDelete(bookId);
            
            await User.findByIdAndUpdate(userId, { $pull: { book: bookId } });
            res
              .status(200)
              .json({ status: "successful", message: "Book deleted successfully" });
        }else{
            res.status(401).json({
                status: "failed",
                message: "you are not authorised to delete this book.",
              });
        }

    }catch(err){
        res.status(500).json({ status: "failed", message: err.message });
    }
}

module.exports = { createBook,getBooks, deleteBook};