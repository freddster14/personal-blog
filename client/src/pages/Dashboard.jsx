import { useState } from 'react'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext'
import { Nav } from '../components/Navbar'

function Dashboard() {
  return (
    <> 
      <Nav/>
      <h1>Hello World!!</h1>
    </>
  )
}

export default Dashboard
