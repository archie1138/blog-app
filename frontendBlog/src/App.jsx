import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import authService from './services/auth';
import { login, logout } from './features/authSlice';
import { Container, Footer, Header } from './components';
import {Outlet} from 'react-router'


function App() {

  const [loading, setLoading] = useState(true) ;
  const theme = useSelector(state => state.theme.themeMode)

  const dispatch = useDispatch() ;

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData)) ;
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
        <Container >
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </Container>
      </>
    )
  }

}

export default App
