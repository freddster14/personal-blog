import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Nav.module.css"

export default function Nav() {
  const { setUser } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/')
  }
  console.log(user)
  return (
    <nav>
      <h1>MyBlog</h1>
      <Link to='/'>Home</Link>
      <Link to='/b/all'>Blogs</Link>
      {user?.role === 'admin' && <Link to='/b/create'>Create</Link>}
      {user 
        ? (<div>
            <h2>{user.name}</h2>
            <button onClick={logout}>Logout</button>
          </div>
          )  
        : (<div>
            <Link to='/sign-up'>Sign Up</Link>
            <Link to="/login">Login</Link>
          </div> 
         )
      }
    </nav>
  )
}