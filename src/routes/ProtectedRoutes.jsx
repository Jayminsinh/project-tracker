import React from 'react'
import { useSelector } from 'react-redux'

import Login from '../pages/Login'

function ProtectedRoutes({children}) {
    const isAuth =  useSelector(state => state.users.isAuth)
    
    
    if(isAuth){
        return children
    } else{
        <Login/>
    }
}

export default ProtectedRoutes
