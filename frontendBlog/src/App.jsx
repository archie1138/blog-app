import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './services/auth';
import { login, logout } from './features/authSlice';
import { Footer, Header } from './components';
import {Outlet} from 'react-router'

function App() {

  const [loading, setLoading] = useState(true) ;

  const dispatch = useDispatch() ;

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData})) ;
      }
      else{
        dispatch(logout())
      }
    })
    .catch((e) => console.error(e))
    .finally(() => setLoading(false)) ;
  }, [dispatch]) ;

  if(loading){
    return(
      <>
        <div>Still Loading</div>
      </>
    )
  }
  else{
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    )
  }

}

export default App
