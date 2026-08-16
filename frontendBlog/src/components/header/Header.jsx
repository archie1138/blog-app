
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import {Button, Logo} from '../index'
import authService from '../../services/auth';
import { logout } from '../../features/authSlice';
import { useState } from 'react';

function Header() {

  const authStatus = useSelector((state) => state.auth.status) 
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const [menuOpen, setMenuOpen] = useState(false)

  const onClickLogout  = () => {
    authService.logout()
    .then((success) => {
      if(success){
        dispatch(logout()) ;
        setMenuOpen(false) ;
      }
    })
  }


  const navItems = [
    {
      name : "Home",
      slug : "/",
      active : true 
    },
    {
      name : "All Posts",
      slug : "/all-posts",
      active : authStatus
    },
    {
      name : "Add Post",
      slug : "/add-post",
      active : authStatus
    },
  ]

  const authItems = [
    {
      name : "Login",
      slug : "/login",
      active : !authStatus,
      type : "link",
    },
    {
      name : "Get Started",
      slug : "/get-started",
      active : !authStatus,
      type : "link",
    },
    {
      name : "Logout",
      slug : "/",
      active : authStatus,
      type : "logout",
    },
  ]

  return (
    <div className="p-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
      <nav>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:pr-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-10 flex-1">
              <Logo className="w-40 h-auto"/>

              {/* Windows Navigation bar */}
              <div className="hidden md:flex md:items-center md:justify-between md:flex-1">
                <ul className='flex items-center gap-8'>
                  {navItems.map( item => item.active ? 
                  (<li key={item.slug}>
                    <NavLink
                      className={ ({isActive}) => `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 
                      ${isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                      }`}
                      to={item.slug}
                    >
                      {item.name}
                    </NavLink>
                    </li>) : null
                  )}
                </ul>
                <ul className='flex items-center gap-8'>
                  {authItems.map( (item) => item.active ? 
                  (<li key={item.slug}>
                    {
                      item.type === "link" ? 
                      (<Button className={"border"} onClick={() =>{
                        navigate(item.slug) 
                      }}>
                        {item.name}
                      </Button>)
                      :
                      <Button className={"border"} onClick={onClickLogout}>
                        {item.name}
                      </Button>
                    }
                    </li>) 
                    : null
                  )}
                </ul>
              </div>
              
              <div className='md:hidden relative ml-auto'>
                  {/* Mobile Navigation bar */}
                  <button
                    className='p-2 text-zinc-700 dark:text-zinc-200
                   hover:bg-zinc-100 dark:hover:bg-zinc-800
                   rounded-lg cursor-pointer'
                    type='button'
                    onClick={() => (setMenuOpen(prev => !prev))}
                  >
                    {menuOpen ? (<span className='text-2xl'>✕</span>) : (<span className='text-2xl'>☰</span>)}
                  </button>

                  {/* Mobile Menu */}
                  {menuOpen && (
                    <div className='absolute right-0 top-full mt-2 z-50 min-w-40
                       bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg'>
                      <ul className='flex flex-col items-center '>
                        {navItems.map( item => item.active ? 
                        (<li key={item.slug} className='w-full p-1.5 text-center dark:hover:bg-zinc-800 hover:bg-zinc-100'>
                          <NavLink
                            onClick={() => (setMenuOpen(false))}
                            className={ ({isActive}) => `block text-sm font-medium transition-colors duration-200 
                            ${isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            }`}
                            to={item.slug}
                          >
                            {item.name}
                          </NavLink>
                          </li>) : null
                        )}
                      </ul>
                      <ul className='flex flex-col items-center my-1 border-t border-zinc-200 dark:border-zinc-800'>
                        {authItems.map( (item) => item.active ? 
                        (<li key={item.slug} className='w-full p-1.5 text-center dark:hover:bg-zinc-800 hover:bg-zinc-100'>
                          {
                            item.type === "link" ? 
                            (<button className="w-full cursor-pointer" onClick={() =>{
                              setMenuOpen(false)
                              navigate(item.slug) 
                            }}>
                              {item.name}
                            </button>)
                            :
                            <button className="w-full cursor-pointer" onClick={onClickLogout}>
                              {item.name}
                            </button>
                          }
                          </li>) 
                          : null
                        )}
                      </ul>
                    </div>
                  )}
              </div>        

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header