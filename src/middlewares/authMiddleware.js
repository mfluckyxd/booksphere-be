const jwt = require('jsonwebtoken');
const User = require("../models/User");


const loginStatus = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const userInfo = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = userInfo.id
      next();
    } catch (err) {
      res.status(400).json({ status: "failed", error: err.message });
    }
  } else {
    res.status(400).json({ status: "failed", message: "please login first" });
  }
};

const roleProtection = async (req,res,next)=>{
    const {userId}=req;
    
    try{
        const user = await User.findById(userId);
        if(user.role=="creator"){
          
          return next();
        }else{
          res.status(400).json({ status: "failed", message: "Only creators are allowed to use this feature." })
        }
        
    }catch(err){
      res.status(500).json({ status: "failed", error: err.message });
    }
}

module.exports = { loginStatus,roleProtection };