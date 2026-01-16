import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Create() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if(user?.role !== 'admin') navigate('/login', { replace: true})
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(title === "" || content === "") {
      setError({ message: 'All fields must be required'});
      return;
    }

    if(content.length < 399) {
      setError({ message: 'Content must be at least 400 characters'});
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({title, content, published})
    };
      const res = await apiFetch(`/b/create`, options);
      navigate(`/b/${res.slug}`)
    } catch (error) {
      setError(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content">Content</label>
        <textarea type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <p>characters {content.length}</p>
        <p>{error.message}</p>
        <button type="submit" onClick={() => setPublished(true)} >Publish</button>
        <button onClick={() => setPublished(false)}>Save to Drafts</button>
      </form>
    </>
  )
}