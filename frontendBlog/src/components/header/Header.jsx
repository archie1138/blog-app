
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import {Button} from '../index'
import authService from '../../services/auth';
import { logout } from '../../features/authSlice';

function Header() {

  const authStatus = useSelector((state) => state.auth.status) 
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const onClickLogout  = () => {
    authService.logout()
    .then((success) => {
      if(success)dispatch(logout()) ;
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
    <div className="p-8 w-full bg-zinc-50 dark:bg-zinc-950">
      <nav className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-10 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="font-bold text-white">B</span>
                </div>

                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Blogify
                </span>
              </div>
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header