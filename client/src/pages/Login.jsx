import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
          <h1>Login</h1>
          <p>Don't have an account?</p>
          <a href="/sign-up">Sign Up</a>
      </div>
      <form action="/login" method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"  />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </form>
    </>
  )
}