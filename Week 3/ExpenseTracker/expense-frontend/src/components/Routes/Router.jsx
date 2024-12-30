import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import RequireAuth from '../Authentication/RequireAuth'
import ExpenseListArea from '../ExpenseListArea/ExpenseListArea'

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login login/>}/>
            <Route path='/signup' element={<Login/>}/>
            <Route element={<RequireAuth />}>
                <Route path='/expenses' element={<ExpenseListArea />}/>
            </Route>
        </Routes>
    )
}

export default Router