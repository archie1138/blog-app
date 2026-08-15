import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './pages/Home/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import AddPost from './pages/AddPost.jsx'
import { Protected } from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    // here we will create our routes
    <Route path={'/'} element={<App/>} >
      <Route path={''} element={<Home/>} />
      <Route path={'/get-started'} element={(
        <Protected authentication={false}>
          <SignUp/>
        </Protected>
      )} />
      <Route path={'/login'} element={(
        <Protected authentication={false}>
          <Login/>
        </Protected>
      )} />
      <Route path={'/all-posts'} element={(
        <Protected authentication={true}>
          <AllPosts/>
        </Protected>
      )} />
      <Route path={'/add-post'} element={(
        <Protected authentication={true}>
          <AddPost/>
        </Protected>
      )} />
      <Route path={'/edit-post/:slug'} element={(
        <Protected authentication={true}>
          <EditPost/>
        </Protected>
      )} />
      <Route path={'/post/:slug'} element={(
        <Protected authentication={true}>
          <Post/>
        </Protected>
      )} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
