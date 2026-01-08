import { useLoaderData } from 'react-router'
import '../styles/Dashboard.css'


function Home() {
  const blogs = useLoaderData();
  console.log(blogs)
  if(!blogs) return null;
  return (
     <div>
      {blogs.map(blog => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  )
}

export default Home
