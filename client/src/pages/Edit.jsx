import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { apiFetch } from "../api/client";
import styles from "../styles/Form.module.css"
import { useAuth } from "../context/AuthContext";

export default function Edit() {
  const { user } = useAuth();
  const blog = useLoaderData();
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [published, setPublished] = useState(blog.published);
  const [error, setError] = useState("");
  const navigate = useNavigate()

   if (!user) {
    const error = new Error('Login to create blog');
    error.status = 401;
    error.statusText = 'Unauthorized';
    throw error;
  }

  if (user.role !== 'admin') {
    const error = new Error('Must be admin');
    error.status = 403;
    error.statusText = 'Forbidden';
    throw error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(title === "" || content === "") {
      setError({ message: 'All fields must be required'});
      return;
    }

    if(content.length < 399 && published) {
      setError({ message: 'Content must be at least 400 characters'});
      return;
    }

    try {
      const options = {
        method: "PUT",
        body: JSON.stringify({ title, content, published })
      };
      await apiFetch(`/b/${blog.slug}`, options)
      navigate(`/b/${blog.slug}`)
    } catch (error) {
      setError(error)
    }
  }

  const handleDelete = async () => {
    try {
      const options = {
        method: "DELETE",
      }
      await apiFetch(`/b/${blog.slug}`, options);
      navigate('/b/all')
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div className={styles.main}>
      <form className={styles.blog} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <p>Published: {`${published}`}</p>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content">Content</label>
        <textarea type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <p>{error.message}</p>
        <button type="submit" onClick={() => setPublished(!published)}>{published ? "Unpublish" : "Publish"}</button>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  )
}