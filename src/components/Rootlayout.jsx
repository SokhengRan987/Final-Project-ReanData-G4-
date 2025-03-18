import React from 'react'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Rootlayout() {
  return (
    <>
        <NavbarComponent/>
        <Outlet/>
        <Footer/>
    </>
  )
}
