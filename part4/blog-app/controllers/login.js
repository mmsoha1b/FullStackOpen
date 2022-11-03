const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { response } = require('../app');

loginRouter.post('/',async(request,response)=>{
    const {username,password} = request.body;
    const user = await User.findOne({username:username});
    const passwordCorrect = user === null?false:await bcrypt.compare(password, user.passwordHash);
    if(!(passwordCorrect && user)){
        return response(401).json({
            error:"Username or password is invalid"
        });
    } 
    const userForToken={
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken,process.env.SECRET);
    response.status(200).send({token,username:user.username,name:user.name});
})
module.exports = loginRouter;  