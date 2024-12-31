import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import RequireAuth from '../Authentication/RequireAuth'
import ExpenseListArea from '../ExpenseListArea/ExpenseListArea'
import ExpenseTable from '../ExpenseTable/ExpenseTable'
import EditExpense from '../ExpenseTable/EditExpense/EditExpense'

const Router = () => {
    return (
        <Routes>
            <Route exact path='/login' element={<Login login/>}/>
            <Route exact path='/signup' element={<Login/>}/>
            <Route element={<RequireAuth />}>
                <Route exact path='/expenses' element={<ExpenseListArea />}/>
                <Route exact path='/expenses/:explistId' element={<ExpenseTable />}/>
                <Route exact path='/expenses/:explistId/:expId' element={<EditExpense />}/>
            </Route>
        </Routes>
    )
}

export default Router