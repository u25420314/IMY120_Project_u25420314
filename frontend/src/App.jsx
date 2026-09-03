import { useState } from 'react'
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import Navigation from "./components/Navigation"
import SplashPage from './pages/SplashPage'
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PostPage from "./pages/PostPage"
import './App.css'

function AppContent() {
  //const [count, setCount] = useState(0)
  const Location = useLocation()
  const showNav = location.pathname !== "/"

  return (
    <>
    {showNav && <Navigation/>}

    
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>
      </Routes>
    </>
  )
}

function App(){
  return(
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}

export default App
