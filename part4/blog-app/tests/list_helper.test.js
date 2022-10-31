const listHelper = require('../utils/list_helper')
const listWithZeroBlogs = [];
const listWithOneBlog = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}];
const listWithMultipleBlogs=[
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      } 
]
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total Likes',()=>{
    
    test('likes of 0 blogs is 0',()=>{
        expect(listHelper.totalLikes(listWithZeroBlogs)).toBe(0);
    });
    test('likes of one blog is equal to its likes ',()=>{
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5);
    });
    test('likes of multiple blogs is equal to their sum',()=>{
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(36);
    });
});
describe('favourite blog',()=>{
    test('returns most liked blog from list of blogs',()=>{
        const result = listHelper.favouriteBlog(listWithMultipleBlogs);
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,})
    })
    test('returns the blog from list of only one blog',()=>{
        const result = listHelper.favouriteBlog(listWithOneBlog);
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5,})
    })
    test('returns 0 from empty list blogs',()=>{
        const result = listHelper.favouriteBlog(listWithZeroBlogs);
        expect(result).toEqual({
            title: "",
            author: "",
            likes: 0,})
    })
});
describe('most blogs ',()=>{
    test('returns author with most blogs from a list of blogs',()=>{
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,})
    });
    test('returns the only author from  list of single blog',()=>{
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1,})
    })
    test('returns no author from list of zero blogs',()=>{
        const result = listHelper.mostBlogs(listWithZeroBlogs);
        expect(result).toEqual({
            author: "",
            blogs: 0,})
    })
});
describe('most likes',()=>{
    test('returns author with most likes from a list of blogs',()=>{
        const result = listHelper.mostLikes(listWithMultipleBlogs);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    });
    test('returns the only author from  list of single blog',()=>{
        const result = listHelper.mostLikes(listWithOneBlog);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5,})
    })
    test('returns no author from list of zero blogs',()=>{
        const result = listHelper.mostLikes(listWithZeroBlogs);
        expect(result).toEqual({
            author: "",
            likes: 0,})
    })
})