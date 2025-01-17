import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AllBlogs from '../AllBlogs/AllBlogs'
import RequireAuth from '../RequireAuth/RequireAuth'
import Login from '../Login/Login'
import ReadBlog from '../ReadBlog/ReadBlog'

const Router = () => {
	return (
		<Routes>
			<Route exact path='/' element={<Navigate to={"/blogs"} />} />
			<Route exact path='/blogs' element={<AllBlogs />} />
			<Route exact path='/signin' element={<Login log={true} />} />
			<Route exact path='/signup' element={<Login />} />
			<Route element={<RequireAuth />}>
				<Route exact path='/blogs/:id' element={<ReadBlog/>} />
			</Route>
		</Routes>
	)
}

export default Router