import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext"

export function Nav() {
  const { setUser } = useAuth();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if(loading) return null;

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