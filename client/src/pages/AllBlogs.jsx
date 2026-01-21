import { useLoaderData, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Blogs.module.css";

export default function AllBlogs() {
  const { user } = useAuth();
  const blogs = useLoaderData();
  if(!blogs) return null;
  const options = { month: "long", day: "numeric", year: "numeric" }
  return (
    <div className={styles.main}>
      {blogs.map(blog => (
        <Link to={`/b/${blog.slug}`} className={styles.blog} key={blog.id}>
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
          <div className={styles.info}>
            <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
            <p>by {blog.author.name}</p>
          </div>
          {user?.role === 'admin' && 
            <div>
               <Link to={`/b/edit/${blog.slug}`}>Edit</Link>
            </div>
          }
        </Link>
      ))}
    </div>
  )
}