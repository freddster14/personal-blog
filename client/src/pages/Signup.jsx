import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div>
          <h1>Sign Up</h1>
          <p>Already have an account?</p>
          <a href="/login">Login</a>
      </div>
      <form action="/b" method="post">
        <label htmlFor="name">Username</label>
        <input type="text" id="name" name="name" onChange={(e) => setName(e.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </form>
    </>
   
  )
}

export default Signup;