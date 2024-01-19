const express = require("express");
const router = express.Router();
// const {createUser, loginUser} = require("../controllers/auth");
const {getBooks,createBook,deleteBook } = require("../controllers/books");
const { loginStatus,roleProtection } = require("../middlewares/authMiddleware");



router.get('/',loginStatus,getBooks );
router.post('/create',loginStatus,roleProtection,createBook);
router.delete('/delete/:bookId',loginStatus,roleProtection,deleteBook)
// router.get('/',()=>{
//     console.log("listning...")
// } );


module.exports = router;