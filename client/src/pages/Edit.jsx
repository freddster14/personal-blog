import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { apiFetch } from "../api/client";

export default function Edit() {
  const blog = useLoaderData();
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [published, setPublished] = useState(blog.published);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <>
      <form onSubmit={handleSubmit}>
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
    </>
  )
}