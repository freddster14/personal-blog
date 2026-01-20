import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/client";

export default function Comments({ comments, slug }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

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
      await apiFetch(`/c/${slug}`, options);
      navigate(0)
    } catch (error) {
      setError(error)
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      await apiFetch(`/c/${id}`, { method: 'DELETE' });
      navigate(0);
    } catch (error) {
      setError(error)
    }
  }
  return (
    <>
    { user ? 
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
      </div>
    }
    <div>
        {comments.length > 0 ? comments.map(c => (
          <div key={c.id}>
            <h3>{c.author.name}</h3>
            <p>{c.content}</p>
            {(user?.role === 'admin' || user?.id === c.authorId) && 
              <form onSubmit={(e) => handleDelete(e, c.id)}><button type="submit">Delete</button></form>
            }
          </div>
        ))
        :
        <p>Be the first to comment. What are you waiting for?</p>
        }
      </div>
    </>
     
  )
}