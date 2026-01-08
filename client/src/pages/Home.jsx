import { useState } from 'react'
import { Outlet } from 'react-router'
import '../styles/Dashboard.css'
import { useAuth } from '../context/AuthContext'
import { Nav } from '../components/Navbar'

function Home() {
  return (
    <> 
      <Nav/>
      <Outlet />
    </>
  )
}

export default Home
