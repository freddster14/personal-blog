import { useState } from "react";
import { formSubmit } from "../api/forms";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "../styles/Form.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !name || !password) {
      setError({ message: "All fields required"});
      return;
    } else if (!confirm) {
      setError({ message: "Please confirm your password" });
      return;
    }
    if(password.length < 8) {
      setError({ message: "Password must be at least 8 characters" });
      return;
    }

    if( password !== confirm) {
      setError({ message: "Passwords do not match"});
      return;
    }
    try {
      const res = await formSubmit('/sign-up', { name, email, password, confirm })
      localStorage.setItem('token',res.token)
      setUser(res.user);
      navigate('/')
    } catch (error) {
      setError({ message: error.data})

    }
  
  }

  return (
    <div className={styles.main}>
      <div>
        <h1>Sign Up</h1>
        <p>Already have an account?</p>
        <a href="/login">Login</a>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="password">Confirm</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <p>{error.message}</p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
   
  )
}

export default Signup;