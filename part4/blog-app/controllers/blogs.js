const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { userExtractor, tokenExtractor } = require('../utils/middlewhere');


blogsRouter.get('/',async (request,response)=>{
  const blogs = await Blog.find({}).populate('user',{name:1,username:1});
  response.json(blogs);
});

blogsRouter.post('/',tokenExtractor,userExtractor,async (request,response)=>{
  if(
    request.body.title===null ||request.body.title===undefined|| request.body.url===null ||
    request.body.url===undefined)
  {
     return response.status(400).end();
  }
  const user = request.user;
  const userId = user._id; 
  const blog = new Blog({
      likes: request.body.likes || 0 ,
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
      user:userId
    })
    await blog.save();
    user.blogs = user.blogs.concat(blog);
    await user.save();
    response.status(201).json(blog);
});

blogsRouter.delete('/:id',tokenExtractor,userExtractor,async(request,response)=>{
  const id = mongoose.Types.ObjectId(request.params.id);
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if(user.id.toString() !== blog.user.toString()){
    return response(403).json({
      error:"You do not have access for this operation"
    });
  }
  await Blog.deleteOne({_id:id});
  return response.status(204).end();

});

blogsRouter.put('/:id',async(request,response)=>{

  const id = mongoose.Types.ObjectId(request.params.id);
  const body = request.body;
  const blog = await Blog.findOne({_id:id});
  blog.likes = body.likes || blog.likes;
  await blog.save();
  response.status(200).json(blog);
})
module.exports = blogsRouter;