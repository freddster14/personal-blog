import { useLoaderData, Link } from 'react-router'
import styles from '../styles/Home.module.css'

function Home() {
  const blogs = useLoaderData();
  if(!blogs) return null;
  const options = { month: "long", day: "numeric", year: "numeric" }
  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <a href={`/b/${blog.slug}`}>
            <h2>{blog.title}</h2>
            <p className={styles.content} >{blog.content}</p>
          </a>
          <div>
            <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
            <p>by {blog.author.name}</p>
          </div> 
        </div>
      ))}
      <div>
        <Link to='/b/all'>View all recent blogs.</Link>
      </div>
    </div>
  )
}

export default Home
