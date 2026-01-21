import { Outlet } from "react-router"
import Nav from "../components/Navbar"
import { useAuth } from "../context/AuthContext"

function Home() {
  const { loading } = useAuth();
  if(loading) return null
  return (
    <> 
      <Nav/>
      <Outlet />
    </>
  )
}

export default Home