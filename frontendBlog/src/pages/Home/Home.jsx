
import { useSelector } from "react-redux"
import AuthenticatedPage from "./AuthenticatedPage"
import LandingPage from "./LandingPage"

function Home() {
    const authStatus = useSelector(state => state.auth.status)

  return (
    authStatus ? <AuthenticatedPage/> : <LandingPage/>    
  )
}

export default Home