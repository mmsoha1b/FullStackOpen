import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const postNew = async (newBlog) => {
  const config = {
    headers:{
      Authorization:token,
    }
  };
  const response = await axios.post(baseUrl,newBlog,config);
  return response.data;
};
const addLike = async(blog,newLikes) => {
  const updateBlog={
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user,
    likes: newLikes,
  };
  try{
    await axios.put(`${baseUrl}/${blog.id}`,updateBlog);
  }
  catch(error){
    console.log(error);
  }
};
const deleteBlog=async(blog) => {
  const config = {
    headers:{
      Authorization:token
    }
  };
  axios.delete(`${baseUrl}/${blog.id}`,config);
};
const blogService = { getAll,postNew,setToken,addLike,deleteBlog };
export default blogService;