import React from 'react'
import { Outlet } from 'react-router-dom'

export const DashBoardPage =() => {
  return (
    <>
    <h1>DashBoardPage</h1>
    <Outlet></Outlet>
    </>
  )
}
