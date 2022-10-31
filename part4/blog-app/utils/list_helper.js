const dummy=(blogs)=>{
    return 1;
}
const totalLikes=(blogs)=>{
    return blogs.reduce((sum, blog)=>{
        return sum+blog.likes
    },0);
}
const favouriteBlog=(blogs)=>{
    if(blogs.length===0){
        return({
            title: '',
            author: '',
            likes: 0,
        })
    }
    const favBlog=blogs.reduce((favBlog, blog)=>
        favBlog.likes > blog.likes ? favBlog : blog
    )
    return({
        title:favBlog.title,
        author:favBlog.author,
        likes:favBlog.likes
    });
}
const mostBlogs=(blogs)=>{
    if(blogs.length===0){
        return({
            author:'',
            blogs:0 
        })
    }
    const blogsWrittenByAuthor={};
    for(let blog of blogs){
        const author = blog.author;
        blogsWrittenByAuthor[author] = blogsWrittenByAuthor[author] + 1 || 1;
    }
    let authorwithMostBlogs = Object.keys(blogsWrittenByAuthor)[0];
    for(let author in blogsWrittenByAuthor){
        if(blogsWrittenByAuthor[author] > blogsWrittenByAuthor[authorwithMostBlogs]){
            authorwithMostBlogs = author;
        }
    }
    return ({ 
        author: authorwithMostBlogs,
        blogs:blogsWrittenByAuthor[authorwithMostBlogs],
     })
};
const mostLikes=(blogs)=>{
    if(blogs.length==0){
        return ({
            author: '',
            likes: 0,
        })
    }
    const likesOfAuthor={};
    for(let blog of blogs){
        const author = blog.author;
        likesOfAuthor[author] = likesOfAuthor[author] + blog.likes || blog.likes;
    }
    let authorwithMostLikes = Object.keys(likesOfAuthor)[0];
    for(let author in likesOfAuthor){
        if(likesOfAuthor[author] > likesOfAuthor[authorwithMostLikes]){
            authorwithMostLikes = author;
        }
    }
    return({
        author: authorwithMostLikes,
        likes: likesOfAuthor[authorwithMostLikes],
    })
}
module.exports={
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}