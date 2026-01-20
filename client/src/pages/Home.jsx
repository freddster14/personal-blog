import { useLoaderData, Link } from 'react-router'
import styles from '../styles/Home.module.css'

function Home() {
  const blogs = useLoaderData();
  if(!blogs) return null;
  const options = { month: "long", day: "numeric", year: "numeric" }
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {blogs.map(blog => (
          <a href={`/b/${blog.slug}`} className={styles.container} key={blog.id}>
            <div>
              <h2>{blog.title}</h2>
              <p className={styles.content} >{blog.content}</p>
            </div>
            <div>
              <p>{new Date(blog.createdAt).toLocaleDateString(undefined, options)}</p>
              <p>by {blog.author.name}</p>
            </div> 
          </a>
        ))}
      </div>
      <Link className={styles.all} to='/b/all'>View all recent blogs.</Link>
    </div>
  )
}

export default Home
