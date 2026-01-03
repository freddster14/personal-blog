import { useAuth } from "../context/AuthContext"

export function Nav() {
  const { user, loading } = useAuth();
  if(loading) return null;
  console.log(user)
  return (
    <nav>
      <h1>MyBlog</h1>
      {user 
        ? (<div>
            <h2>{user.name}</h2>
            <a href="/logout">Logout</a>
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