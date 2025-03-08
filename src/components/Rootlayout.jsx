import React from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Rootlayout() {
  return (
    <div>
        <NavbarComponent/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
