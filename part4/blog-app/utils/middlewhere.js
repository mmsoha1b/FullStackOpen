const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const tokenExtractor = (request,response,next)=>{
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
      request.token = authorization.substring(7);
    }
    else{
      request.token = null;
    }
    next();
};
const userExtractor = async (request,response,next)=>{
    const token = request.token;
    if(token === null ){

      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const decodedToken = jwt.verify(token,process.env.SECRET);
    if (!decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const userId = mongoose.Types.ObjectId(decodedToken.id);
    const user = await User.findById(userId);
    request.user = user;
    next();
}
module.exports={tokenExtractor,userExtractor} 