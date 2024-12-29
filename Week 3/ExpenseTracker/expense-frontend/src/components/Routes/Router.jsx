import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login login/>}/>
            <Route path='/signup' element={<Login/>}/>
        </Routes>
    )
}

export default Router