import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

test("tests blog is renderd",async() => {
  const blogs = [];
  const mockHandler=jest.fn();
  const blog = {
    likes:1,
    author:"kKIM",
    title:"Test Blog"
  };
  const blogUser={
    id:1,
  };
  const { container } = render(<Blog blog={blog} user={blogUser} setBlogs ={mockHandler} blogs={blogs}/>);
  const blog_basics = container.querySelector(".blog-basics"); // testing-library/eslint-disable-line no-node-access
  const blog_details= container.querySelector(".blog-details");// testing-library/eslint-disable-line no-node-access
  expect(blog_basics).toHaveTextContent("Test Blog");
  expect(blog_details).toHaveStyle("display: none");
  expect(blog_details).toHaveStyle("display: none");
});

test("Checks if url and likes are viible when user cliks view button",async() => {
  const blogs = [];
  const mockHandler=jest.fn();
  const blog = {
    likes:1,
    author:"kKIM",
    title:"Test Blog"
  };
  const blogUser={
    id:1,
  };
  const user = userEvent.setup();
  const { container } = render(<Blog blog={blog} user={blogUser} setBlogs ={mockHandler} blogs={blogs}/>);
  const button = screen.getByText("view");
  await user.click(button);
  const blog_basics = container.querySelector(".blog-basics"); // testing-library/eslint-disable-line no-node-access
  const blog_details= container.querySelector(".blog-details");// testing-library/eslint-disable-line no-node-access
  expect(blog_basics).toHaveTextContent("Test Blog");
  expect(blog_details).not.toHaveStyle("display: none");
  expect(blog_details).not.toHaveStyle("display: none");
});
test("Checks like called twice when like button pressed",async() => {
  const blogs = [];
  const mockHandler = jest.fn();
  const blog = {
    likes:1,
    author:"kKIM",
    title:"Test Blog"
  };
  const blogUser={
    id:1,
  };
  const { container } = render(<Blog blog={blog} user={blogUser} setBlogs ={mockHandler} blogs={blogs} onLike={mockHandler}></Blog>);
  const likeButton = container.querySelector(".like-button");
  screen.debug(likeButton);
  const user = userEvent.setup();

  await user.click(likeButton);
  await userEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
test(" New blog creatad when button pressed",async() => {
  const blogs = [];
  const setBlogsMock = jest.fn();
  const setErrorMock = jest.fn();
  const setNotificationMock = jest.fn();
  const postNewMock = jest.fn();
  const blogUser={
    id:1,
  };
  const user = userEvent.setup();
  const { container } = render(<NewBlog blogs={blogs} user={blogUser} setBlogs ={setBlogsMock}
    setNotification={setNotificationMock} setError={setErrorMock} postNew={postNewMock} />);
  const inputTitle = container.querySelector(".input-title");
  const inputAuthor = container.querySelector(".input-author");
  const inputUrl = container.querySelector(".input-url");
  await user.type(inputTitle,"typing tile");
  await user.type(inputAuthor, "typing author");
  await user.type(inputUrl, "typing url");
  const button2 = screen.getByText("create");
  await user.click(button2);
  expect(postNewMock.mock.calls).toHaveLength(1);
  expect(postNewMock).toHaveBeenCalledWith({
    author: "typing author", title: "typing tile", url: "typing url" }
  );
});