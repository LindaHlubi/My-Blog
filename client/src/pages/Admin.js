import React from "react";
import BlogEditor from "../components/Editor/BlogEditor";
import Navbar from "../components/Navbar";
import ShowBlog from "../components/Editor/ShowBlog";

const Admin = () => {
  return (
    <>
      <Navbar />
      <BlogEditor />
      
      <ShowBlog />
      
    </>
  );
};

export default Admin;
