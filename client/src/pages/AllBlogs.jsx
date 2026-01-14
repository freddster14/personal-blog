import { useLoaderData, Link } from "react-router";

export default function AllBlogs() {
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
        </div>
      ))}
    </div>
  )
}