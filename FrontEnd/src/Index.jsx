import React, {createContext, useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { DashBoardPage } from './pages/DashBoardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AddA_ServicesPage } from './pages/A_ServicesPage/AddA_ServicesPage'
import { UpdateA_ServicesPage } from './pages/A_ServicesPage/UpdateA_ServicesPage'
import { AddAccountPage } from './pages/AccountPage/AddAccountPage'
import { UpdateAccountPage } from './pages/AccountPage/UpdateAccountPage'
import { AddLeasePage } from './pages/LeasePage/AddLeasePage'
import { UpdateLeasePage } from './pages/LeasePage/UpdateLeasePage'
import { AddStoragePage } from './pages/StoragePage/AddStoragePage'
import { UpdateStoragePage } from './pages/StoragePage/UpdateStoragePage'
import { AddUserPage } from './pages/UserPage/AddUserPage'
import { UpdateUserPage } from './pages/UserPage/UpdateUserPage'
import { WorkerPage } from './pages/WorkerPage'
import { A_ServicesTable } from './components/A_ServicesTable'
import { AccountTable  } from './components/AccountTable'
import { LeaseTable } from './components/LeaseTable'
import { StorageTable } from './components/StorageTable'
import { UserTable } from './components/UserTable'

export const AuthContext = createContext();

export const Index = () => {
    const [loggedAdmin, setLoggedAdmin] = useState(false)
    const [loggedWorker, setLoggedWorker] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        let token = localStorage.getItem('token')
        let role = localStorage.getItem('role')
        if(token) setLoggedIn(true)
        if(token && role == 'ADMIN') setLoggedAdmin(true)
        if(token && role == 'WORKER') setLoggedWorker(true)
    }, [])

    const routes = createBrowserRouter([
        {
          path: '/',
          element: <App></App>,
          errorElement: <NotFoundPage></NotFoundPage>,
          children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path:'/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/dashboard',
                element: loggedAdmin ? <DashBoardPage></DashBoardPage> : <LoginPage></LoginPage>,
                children: [
                    {
                        path: 'A_Services',
                        element: <A_ServicesTable></A_ServicesTable>
                    },
                    {
                        path: 'Account',
                        element: <AccountTable></AccountTable>
                    },
                    {
                        path: 'Lease',
                        element: <LeaseTable></LeaseTable>
                    },
                    {
                        path: 'Storage',
                        element: <StorageTable></StorageTable>
                    },
                    {
                        path: 'User',
                        element: <UserTable></UserTable>
                    }
                ]    
            },
            {
                path: '/worker',
                element: loggedWorker ? <WorkerPage></WorkerPage> : <LoginPage></LoginPage>    
            },
            {
                path: '/addA_Service',
                element: loggedAdmin ? <AddA_ServicesPage></AddA_ServicesPage> : <LoginPage></LoginPage>
            },
            {
                path: '/updateA_Service',
                element: loggedAdmin ? <UpdateA_ServicesPage></UpdateA_ServicesPage> : <LoginPage></LoginPage>
            },
            {
                path: '/addAccount',
                element: loggedAdmin ? <AddAccountPage></AddAccountPage> : <LoginPage></LoginPage>
            },
            {
                path: '/updateAccount',
                element: loggedAdmin ? <UpdateAccountPage></UpdateAccountPage> : <LoginPage></LoginPage>
            },
            {
                path: '/addLease',
                element: loggedIn ? <AddLeasePage></AddLeasePage> : <LoginPage></LoginPage>
            },
            {
                path: '/updateLease',
                element: loggedIn ? <UpdateLeasePage></UpdateLeasePage> : <LoginPage></LoginPage>
            },
            {
                path: '/addStorage',
                element: loggedAdmin ? <AddStoragePage></AddStoragePage> : <LoginPage></LoginPage>
            },
            {
                path: '/updateStorage',
                element: loggedAdmin ? <UpdateStoragePage></UpdateStoragePage> : <LoginPage></LoginPage>
            },
            {
                path: '/addUser',
                element: loggedAdmin ? <AddUserPage></AddUserPage> : <LoginPage></LoginPage>
            },
            {
                path: '/updateUser',
                element: loggedAdmin ? <UpdateUserPage></UpdateUserPage> : <LoginPage></LoginPage>
            }
          ]  
        }
    ])

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, loggedAdmin, setLoggedAdmin, loggedWorker, setLoggedWorker}}>
        <RouterProvider router={routes}/>
    </AuthContext.Provider>
  )
}
