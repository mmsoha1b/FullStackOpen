import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login';
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]= useState('');
  const [password,setPassword]=useState('');
  const [user,setUser] = useState(null);
  const [title,setTitle]= useState('')
  const [author,setAuthor]= useState('')
  const [url,setUrl]= useState('')
  const [notification,setNotification] = useState('');
  const [error,setError] = useState(false);
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
      )  
    }, [])
    useEffect(()=>{
      const userString = window.localStorage.getItem('loggedInUser');
      if(userString!==null){
        const user = JSON.parse(userString);
        setUser(user);
        blogService.setToken(user.token);
      }
    },[])
    
    const logOutHandler=()=>{
       loginService.logOut(setUser);
       setNotification(`logged out`);
       setTimeout(()=>{
        setNotification('');
       },3000);
     }
    if(user===null){
    
    return(
      <div>

      <Notification notification={notification} error={error} setError={setError}/>
      <Login username={username} password={password} setUsername = {setUsername} setPassword={setPassword}
                        user={user} setUser={setUser} setNotification={setNotification} setError={setError}/>
      </div>
  )}
  return (
    <div>
      <Notification notification = {notification} error={error}/>
      {user.username} logged in <button onClick={logOutHandler}>LogOut</button>
      <NewBlog title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor}
               setUrl={setUrl} blogs={blogs} setBlogs={setBlogs} notification={notification} 
               setNotification={setNotification} setError={setError}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
