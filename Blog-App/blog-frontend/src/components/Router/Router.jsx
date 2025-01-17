import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBlogs from '../AllBlogs/AllBlogs'
import RequireAuth from '../RequireAuth/RequireAuth'

const Router = () => {
	return (
		<Routes>
			<Route exact path='/' element={<Navigate to={"/blogs"} />} />
			<Route exact path='/blogs' element={<AllBlogs />} />
			<Route element={<RequireAuth />}>
				<Route exact path='/blogs/:id' element={<p>Reading blog</p>} />
			</Route>
		</Routes>
	)
}

export default Router