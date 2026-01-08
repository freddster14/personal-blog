import { useLoaderData } from "react-router";

function Blog() {
  const blog = useLoaderData();
  const options = { month: "long", day: "numeric", year: "numeric" }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <p>{blog.author.name}</p>
        <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
      </div>
      <p>{blog.content}</p>
    </div>
  )
}

export default Blog;