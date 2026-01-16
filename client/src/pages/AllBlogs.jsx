import { useLoaderData, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AllBlogs() {
  const { user } = useAuth();
  const blogs = useLoaderData();
  if(!blogs) return null;
  const options = { month: "long", day: "numeric", year: "numeric" }
  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <Link to={`/b/${blog.slug}`}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </Link>
          <div>
            <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
            <p>by {blog.author.name}</p>
          </div>
          {user?.role === 'admin' && 
            <div>
               <Link to={`/b/edit/${blog.slug}`}>Edit</Link>
            </div>
          }
        </div>
      ))}
    </div>
  )
}