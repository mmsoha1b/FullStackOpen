import { useState } from "react";
// import blogService from "../services/blogs";
const NewBlog=({ setBlogs,blogs,setNotification,setError,user,postNew }) => {
  const [title,setTitle]= useState("");
  const [author,setAuthor]= useState("");
  const [url,setUrl]= useState("");
  const handleTitle=(event) => {
    setTitle(event.target.value);
  };
  const handleAuthor=(event) => {
    setAuthor(event.target.value);
  };
  const handleUrl=(event) => {
    setUrl(event.target.value);
  };
  const makeNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = { title:title,author:author,url:url };
    try{
      const savedBlog = await postNew(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      savedBlog.user=user;
      setBlogs(blogs.concat(savedBlog));
      console.log("Go fool");
      setNotification(` a new blog ${savedBlog.title} by ${savedBlog.author} added`);
      setTimeout(() => {
        setNotification("");
      },5000);
    }
    catch(exception){
      const err = exception.message;
      setError(true);
      console.log(err);
      setNotification(err);
      setTimeout(() => {
        setError(false);
        setNotification("");
      },3000);
    }
  };
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={makeNewBlog}>
        <label htmlFor = 'title'>title </label>
        <input
          type='string'
          name='title'
          value={title}
          className="input-title"
          onChange={handleTitle}
        />
        <br/>
        <label htmlFor = 'author'>author </label>
        <input
          type='string'
          name='author'
          className="input-author"
          value={author}
          onChange={handleAuthor}
        />
        <br/>
        <label htmlFor = 'url'>url </label>
        <input
          type='string'
          name='url'
          className="input-url"
          value={url}
          onChange={handleUrl}
        />
        <br/>
        <button>create</button>
      </form>
    </>
  );
};
export default NewBlog;