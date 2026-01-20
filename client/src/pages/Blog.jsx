import { useLoaderData, Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { apiFetch } from "../api/client";

function Blog() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState("")
  const blog = useLoaderData();
  const navigate = useNavigate();
  const options = { month: "long", day: "numeric", year: "numeric" }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!content) {
      setError({ message: "Comment must not be empty"})
      return;
    }
    const options = {
        method: "POST",
        body: JSON.stringify({ content })
    };
    try {
      await apiFetch(`/c/${blog.slug}`, options);
      navigate(0)
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      {user?.role === 'admin' && 
      <div>
        <p>Published: {`${blog.published}`}</p>
        <Link to={`/b/edit/${blog.slug}`}>Edit</Link>
      </div>
      }
      <div>
        <p>{blog.author.name}</p>
        <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
      </div>
      <pre>{blog.content}</pre>
      {user ? 
      <form onSubmit={handleSubmit}>
        <h2>Add a comment</h2>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="write your comment here"></textarea>
        <button type="submit">Post</button>
        <p>{error.message}</p>
      </form> 
      : 
      <div>
        <h2>Login to join the conversation</h2>
        <p><Link to="/login">Login</Link></p>
      </div>}
      
      <div>
        {blog.comments.length > 0 ? blog.comments.map(c => (
          <div key={c.id}>
            <h3>{c.author.name}</h3>
            <p>{c.content}</p>
          </div>
        ))
        :
        <p>Be the first to comment. What are you waiting for?</p>
        }
      </div>
    </div>
  )
}

export default Blog;