import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { formSubmit } from "../api/forms";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password) {
      setError({ message: "All fields are required" });
      return;
    }
    try {
      const res = await formSubmit('/login', { email, password });
      localStorage.setItem('token', res.token);
      setUser(res.user);
      navigate('/')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <p>Don't have an account?</p>
        <a href="/sign-up">Sign Up</a>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}  />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <p>{error.message}</p>
        <button type="submit">Login</button>
      </form>
    </>
  )
}