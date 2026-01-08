import { Outlet } from "react-router"
import { Nav } from "../components/Navbar"



function Home() {
  return (
    <> 
      <Nav/>
      <Outlet />
    </>
  )
}

export default Home