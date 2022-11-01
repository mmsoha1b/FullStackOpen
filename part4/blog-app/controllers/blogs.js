const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
blogsRouter.get('/',async (request,response)=>{
  const blogs = await Blog.find({});
  response.json(blogs);
});
blogsRouter.post('/',async (request,response)=>{
  if(
    request.body.title===null ||request.body.title===undefined|| request.body.url===null ||
    request.body.url===undefined)
  {
     return response.status(400).end();
  }  
  const blog = new Blog({
      likes: request.body.likes || 0 ,
      author: request.body.author,
      title: request.body.title,
      url: request.body.url,
    })
    await blog.save();
    response.status(201).json(blog);
});
blogsRouter.delete('/:id',async(request,response)=>{
  const id = mongoose.Types.ObjectId(request.params.id);
  await Blog.deleteOne({_id:id});
  response.status(204).end();
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