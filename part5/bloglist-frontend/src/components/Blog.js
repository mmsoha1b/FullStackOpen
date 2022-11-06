import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const Blog = ({ blog,user,blogs,setBlogs,onLike }) => {
  const [likes,setLikes]=useState(blog.likes);
  const [visible,setVisible]= useState(false);
  const showWhenVisible = { display:visible?"":"none" };
  const buttonLabel = visible?"hide":"view";
  const showWhenAuthorizedUser = { display: user.id===blog.user?.id ?"":"none" };

  const toggleVisible=() => {
    setVisible(!visible);
  };
  const likeHandler=() => {
    onLike();
    blogService.addLike(blog,likes+1);
    setLikes(likes+1);
  };
  const removeBlog=() => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogService.deleteBlog(blog);
      const newBlogs = blogs.filter((Blog) => Blog.id !==blog.id?Blog:null );
      setBlogs(newBlogs);
    }
  };
  return(
    <div style={{
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5 }} className="blog">
      <div className="blog-basics">
        <b>{blog.title} {blog.author}</b> <button onClick={toggleVisible}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        <div>
          {blog.url}
        </div>
        <div>
        likes {likes} <button className="like-button" onClick={likeHandler}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div style={showWhenAuthorizedUser}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  );};
Blog.propTypes={
  blog:PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs:PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
};

export default Blog;