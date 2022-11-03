import blogService from "../services/blogs";
const NewBlog=({author,url,title,setAuthor,setUrl,setTitle,setBlogs,blogs,setNotification,setError})=>{
    const handleTitle=(event)=>{
        setTitle(event.target.value);
    }
    const handleAuthor=(event)=>{
        setAuthor(event.target.value)
    }
    const handleUrl=(event)=>{
        setUrl(event.target.value);
    }
    const makeNewBlog = async (event)=>{
        event.preventDefault();
        const newBlog = {title:title,author:author,url:url};
        try{
            const savedBlog = await blogService.postNew(newBlog);
            setTitle('');
            setAuthor('');
            setUrl('');
            setBlogs(blogs.concat(savedBlog));
            setNotification(` a new blog ${savedBlog.title} by ${savedBlog.author} added`);
            setTimeout(()=>{
                setNotification('');
            },5000)
        }
        catch(exception){
            const err = exception.message;
            setError(true);
            setNotification(err);
            setTimeout(()=>{
                setError(false);
                setNotification('');
            },3000)
        }
    }
    return(
    <>
    <h2>create new</h2>
    <form onSubmit={makeNewBlog}>
        <label for = 'title'>title </label>
        <input
         type='string'
         name='title'
         value={title}
         onChange={handleTitle}
        />
        <br/>
        <label for = 'author'>author </label>
        <input
         type='string'
         name='author'
         value={author}
         onChange={handleAuthor}
        />
        <br/>
        <label for = 'url'>url </label>
        <input
         type='string'
         name='url'
         value={url}
         onChange={handleUrl}
        />
        <br/>
        <button>create</button>
    </form>
    </>
    )
}
export default NewBlog;