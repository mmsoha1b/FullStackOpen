import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}
const setToken = (newToken)=>{
  token = `bearer ${newToken}`;
}
const postNew = async (newBlog)=>{
  const config = {
    headers:{
      Authorization:token,
    }
  }
  const response = await axios.post(baseUrl,newBlog,config);
  return response.data;
}
const blogService = {getAll,postNew,setToken};
export default blogService;