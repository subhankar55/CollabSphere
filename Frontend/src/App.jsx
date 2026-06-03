import React from 'react'

import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Hero from './pages/Hero.jsx'
import Docs from './pages/Docs.jsx'
import Workspace from './pages/Workspace.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Hero/>}/>
          <Route path="/docs" element={<Docs/>}/>
          <Route path='/workspace' element={<Workspace/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </>
    )
  )


  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
