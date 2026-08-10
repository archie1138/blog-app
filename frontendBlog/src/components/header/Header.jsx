
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

function Header() {

  const authStatus = useSelector((state) => state.auth.status) 

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
      active : !authStatus
    },
    {
      name : "Get Started",
      slug : "/get-started",
      active : !authStatus
    },
    {
      name : "Logout",
      slug : "/logout",
      active : authStatus
    },
  ]

  return (
    <div className="p-8 w-full bg-white dark:bg-black">
      <nav className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-8 flex-1">
              <div className="shrink-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Brand
                </h2>
              </div>
              <div className="hidden md:flex md:items-center md:justify-between md:flex-1">
                  <ul className='flex items-center gap-8'>
                    {navItems.map( item => item.active ? 
                    (<li key={item.slug}>
                      <NavLink
                        className={ ({isActive}) => `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 
                        ${isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                        to={item.slug}
                      >
                        {item.name}
                      </NavLink>
                      </li>) : null
                    )}
                  </ul>
                  <ul className='flex items-center gap-8'>
                    {authItems.map( item => item.active ? 
                    (<li key={item.slug}>
                      <NavLink
                        className={ ({isActive}) => 
                          `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 
                          
                          ${isActive
                          ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                        to={item.slug}
                      >
                        {item.name}
                      </NavLink>
                      </li>) : null
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