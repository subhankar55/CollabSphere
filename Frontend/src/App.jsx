import React, { useEffect, useState } from 'react'

import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Hero from './pages/Hero.jsx'
import Docs from './pages/Docs.jsx'
import Workspace from './pages/Workspace.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Pricing from './pages/Pricing.jsx'
import Message from './pages/Message.jsx'
import Project from './pages/Projects.jsx'
import Tasks from './pages/Tasks.jsx'
import Notification from './pages/Notification.jsx'
import { AuthProvider } from './context/authContext.js'
import { authInfo } from './services/authData.js'

function App() {


  const [auth,setAuth] = useState("");

  useEffect(
    () => {
      authInfo()
      .then((result) => {
        console.log(result.data.username);
        setAuth(result.data.username);
      })
      .catch((err) => {
        setAuth("");
      });
    },[]
  )

  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Hero/>}/>
          <Route path="/docs" element={<Docs/>}/>
          <Route path='/workspace' element={<Workspace/>} />
          <Route path='/pricing' element={<Pricing/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/message' element={<Message/>} />
        <Route path='/projects' element={<Project/>} />
        <Route path='/tasks' element={<Tasks/>} />
        <Route path='/notifications' element={<Notification/>} />
      </>
    )
  )


  return (
    <AuthProvider value={{username: auth,updateUsername: setAuth}}>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthProvider>
  )
}

export default App;
