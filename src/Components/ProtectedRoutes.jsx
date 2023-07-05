import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Storage from './Storage'

export const ProtectedRoutes = ({ children}) => {
    const authUser = Storage.get('authUser');
    if(!authUser){
        return <Navigate to='/login' />
    }
    return <Outlet />
}

export default ProtectedRoutes