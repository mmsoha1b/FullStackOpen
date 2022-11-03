const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const usersRouter = require('express').Router();

usersRouter.get('/',async(request,response)=>{
    const users = await User.find({}).populate('blogs',{title:1,author:1,likes:1,url:1});
    response.status(200).json(users); 
});
usersRouter.post('/',async(request,response)=>{
    const body = request.body;
    if(!body.username || !body.password){
        return response.status(400).send("Username and password must be present");
    }
    if(body.username.length<3){
        return response.status(400).send("Username must be longer than 3 characters");
    }
    if(body.password.length<3){
        return response.status(400).send("Password must be longer than 3 characters");
    }
    const userAlreadyPresent = await User.findOne({username:body.username});
    if(userAlreadyPresent){
        return response.status(400).send("Username must be unique");
    }
    const [name,password,username] = [body.name,body.password,body.username];
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);
    const newUser = new User({
        name:name,
        username:username,
        passwordHash:passwordHash
    });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
})
module.exports = usersRouter