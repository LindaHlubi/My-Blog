import React, { useState, useContext } from "react";
import BlogEditor from "../Editor/BlogEditor";
import "../../scss/addBlog.scss";
import Tags from "./Tags";
import { EditorState, convertToRaw } from "draft-js";
import { BlogContext } from "../../context/BlogContext";
import { Redirect } from "react-router-dom";

const AddBlog = () => {
  //context
  const { blogState, addBlog } = useContext(BlogContext);
  const { titleErr, success, blog, error } = blogState;
  const [editorErr, setEditorErr] = useState(null);
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState([]);
  

  const handleSubmit = e => {
    e.preventDefault();
    setEditorErr("");
    if (editorState.getCurrentContent().hasText()) {
      const contentRaw = convertToRaw(editorState.getCurrentContent());
      const newBlog = {
        title,
        body: JSON.stringify(contentRaw),
        tags
      };
      addBlog(newBlog);
    } else {
      setEditorErr("Content must not be empty");
    }
  };
  if (success) {
    return (
      <Redirect
        to={{
          pathname: `/blog/${blog._id}`
        }}
      />
    );
  }
  return (
    <div className="addBlog">
      {success && <p>{success}</p>}
      {error && <p className="error">{error}</p>}

      <section className="form">
        <h2>Create New Blog</h2>
        <form>
          <div className="title item">
            <label htmlFor="title">Blog Title:</label>
            <input
              type="text"
              maxLength="60"
              value={title}
              name="title"
              className={
                titleErr ? (titleErr.length >= 1 ? "hasError" : "") : ""
              }
              onChange={e => setTitle(e.target.value)}
            />
            <small className="errorMsg">{titleErr}</small>
          </div>
          <div className="editor">
            <p>Blog Content Editor: </p>
            <BlogEditor
              editorState={editorState}
              setEditorState={setEditorState}
              editorErr={editorErr}
            />
            {editorErr && <small>{editorErr}</small>}
          </div>
          <Tags tags={tags} setTags={setTags} />

          <div className="postBlog">
            <button onClick={handleSubmit}>Publish Post</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddBlog;
