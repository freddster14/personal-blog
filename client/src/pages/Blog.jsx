import { useLoaderData, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Blog() {
  const { user, loading } = useAuth();
  const blog = useLoaderData();
  const options = { month: "long", day: "numeric", year: "numeric" }
  if(loading) return null;
  return (
    <div>
      <h1>{blog.title}</h1>
      {user?.role === 'admin' && 
      <div>
        <Link to={`/b/edit/${blog.slug}`}>Edit</Link>
        <Link to={`/b/delete/${blog.slug}`}>Delete</Link>
      </div>
      }
      <div>
        <p>{blog.author.name}</p>
        <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
      </div>
      <pre>{blog.content}</pre>
    </div>
  )
}

export default Blog;