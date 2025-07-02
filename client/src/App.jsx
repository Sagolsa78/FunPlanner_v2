import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/sections/Navbar'
import HeroSection from './components/sections/HeroSection'
import HeroDashboard from './components/HeroDashboard'
import Login from './auth/Login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import Signup from './auth/Signup'
import DashboardLayout from './components/UserDashboard/layout/DashboardLayout'
import ClientDashboard from './components/UserDashboard/dashboard/Client-dashboard'
import VendorsDashboard from './components/UserDashboard/dashboard/Vendor-dashboard'
import ClientProfile from './components/UserDashboard/profiles/Client-profile'
import EventProfile from './components/UserDashboard/profiles/Event-profile'
import EventDashboard from './components/UserDashboard/dashboard/Event-dashboard'
import VendorProfile from './components/UserDashboard/profiles/Vendor-profile'

const browserRouter = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
   {
    path:'/dashboard',
    element:<DashboardLayout/>
  },{
    path:'/client-dashboard',
    element:<ClientDashboard/>
  },
  {
    path:'/vendor-dashboard',
    element:<VendorsDashboard/>
  },
  {
    path:'/client-profile/:id',
    element:<ClientProfile/>
  },
  {
    path:'/event-profile/:id',
    element:<EventProfile/>
  },
  {
    path:'/event-dashboard',
    element:<EventDashboard/>
  },
  {
    path:'/vendor-profile/:id',
    element:<VendorProfile/>
  }
])

function App() {
  return (
   <RouterProvider router={browserRouter}/>
  )
}

export default App
