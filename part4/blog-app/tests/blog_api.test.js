const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

const initialBlogs=[
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
]
beforeEach(async()=>{
    await Blog.deleteMany({});
    let newBlog = new Blog(initialBlogs[0]);
    await newBlog.save(); 
    newBlog = new Blog(initialBlogs[1]);
    await newBlog.save(); 
},100000);
test('returns correct number of blogs on get request',async()=>{
    const response = await api.get('/api/blogs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(initialBlogs.length);
})
test('retruns unique identifier as id',async()=>{
    const response = await api.get('/api/blogs');
    for (let blog of response.body){
        expect(blog.id).toBeDefined;
    }
})
test('adds blog to databse',async()=>{
    newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    };
    await api.post('/api/blogs').send(newBlog);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    const blogsEssentials=response.body.map(blog=>{
       return{ 
        title:blog.title, 
        author: blog.author, 
        likes:blog.likes,
        url:blog.url,
    }
    })
    expect(blogsEssentials.at(-1)).toEqual(newBlog);
    
})
test('likes default t0 0',async()=>{
    newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };
    await api.post('/api/blogs').send(newBlog);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    const blogsEssentials = response.body.map(blog=>{
       return{ 
        title:blog.title, 
        author: blog.author, 
        likes:blog.likes,
        url:blog.url,
    }
    })
    expect(blogsEssentials.at(-1).likes).toBe(0);
})
test('bad request when title not present',async()=>{
    newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
})
test('bad request when url not present',async()=>{
    newBlog = {
        title:"AAAA",
        author: "Edsger W. Dijkstra",
        likes:9,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
})
test('updates successfully',async()=>{
    const response = await api.get('/api/blogs');
    const blogUpdateId = response.body[0].id;
    const newLikes = response.body[0].likes+1;
    const updateValues = {likes:newLikes};
    const res = await api.put(`/api/blogs/${blogUpdateId}`).send(updateValues);
    expect(res.status).toBe(200);
    expect(res.body.likes).toBe(newLikes);
},100000)
test('deletes succesfully',async()=>{
    const response = await api.get('/api/blogs');
    const blogDeleteId = response.body[0].id;
    const res = await api.delete(`/api/blogs/${blogDeleteId}`);
    expect(res.status).toBe(204);
    const finalResponse = await api.get('/api/blogs');
    expect(finalResponse.body).toHaveLength(initialBlogs.length-1);
},100000);




afterAll(() => {
    mongoose.connection.close()
  })