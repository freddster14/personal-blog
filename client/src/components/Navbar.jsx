import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"

export function Nav() {
  const { setUser } = useAuth();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if(loading) return null;

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  }
  console.log(user)
  return (
    <nav>
      <h1>MyBlog</h1>
      {user 
        ? (<div>
            <h2>{user.name}</h2>
            <button onClick={logout}>Logout</button>
          </div>
          )  
        : (<div>
            <a href="/sign-up">Signup</a>
            <a href="/login">Login</a>
          </div> 
         )
      }
    </nav>
  )
}