const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

const createUser = async (req, res) => {
  const {email, password } = req.body;
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = req.body;
    user.password = hashedPassword;
    try {
      const existingUser = await User.findOne({ email });
      if(existingUser){
        throw new Error("Duplicate user");
      }

      const userData = await User.create(user);
      res
        .status(201)
        .json({ status: "success", message: "user created successfully" });
    } catch (err) {
      
      res.status(400).json({ status: "fail", error: err.message });
    }
  } else {
    res.status(400).json({ status: "fail", error: "data not available" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordMatched = bcrypt.compareSync(password, user.password);
      if (isPasswordMatched) {
        
        const token = generateToken({ id: user._id }, 300);
        res
          .status(200)
          .json({ status: "success", message: "login successful", token,userId:user._id, role:user.role  });
      } else {
        res.status(400).json({ status: "fail", message: "wrong password" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "user not found" });
    }
  } catch (err) {
    
    
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = { createUser, loginUser};