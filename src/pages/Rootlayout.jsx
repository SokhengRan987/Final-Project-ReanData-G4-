import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import Footer from '../components/Footer'
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
