import { useState, useEffect } from "react";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import ToggleVisibility from "./components/ToggleVisibility";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username,setUsername]= useState("");
  const [password,setPassword]=useState("");
  const [user,setUser] = useState(null);
  const [notification,setNotification] = useState("");
  const [error,setError] = useState(false);
  const sortBlogs=() => {
    blogs.sort((blog,nextBlog) => {
      return blog.likes > nextBlog.likes ? -1 : 1;
    });};
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, [] );
  useEffect(() => {
    const userString = window.localStorage.getItem("loggedInUser");
    if(userString!==null){
      const user = JSON.parse(userString);
      setUser(user);
      blogService.setToken(user.token);
    }
  },[]);
  const onLike=() => {
    return;
  };
  const logOutHandler=() => {
    loginService.logOut(setUser);
    setNotification("logged out");
    setTimeout(() => {
      setNotification("");
    },3000);
  };
  if(user===null){
    return(
      <div>

        <Notification notification={notification} error={error} setError={setError}/>
        <Login username={username} password={password} setUsername = {setUsername} setPassword={setPassword}
          user={user} setUser={setUser} setNotification={setNotification} setError={setError}/>
      </div>
    );}
  return (

    <div>
      <Notification notification = {notification} error={error}/>
      {user.username} logged in <button onClick={logOutHandler}>LogOut</button>
      <ToggleVisibility>

        <NewBlog blogs={blogs} setBlogs={setBlogs} notification={notification}
          setNotification={setNotification} setError={setError} sortBlogs={sortBlogs}
          user={user} postNew={blogService.postNew}/>
      </ToggleVisibility>
      <h2>blogs</h2>
      {sortBlogs()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} onLike={onLike}/>)}
    </div>
  );
};

export default App;
