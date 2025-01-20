import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AllBlogs from '../AllBlogs/AllBlogs'
import RequireAuth from '../RequireAuth/RequireAuth'
import Login from '../Login/Login'
import ReadBlog from '../ReadBlog/ReadBlog'
import EditBlog from '../EditBlog'
import NewBlog from '../NewBlog/NewBlog'
import EditAuthority from '../Authorization/EditAuthority'
import Error from '../Errors/Error'
import Unauthorized from '../Unauthorized/Unauthorized'
import FourOFour from '../FourOFour/FourOFour'

const Router = () => {
	return (
		<Routes>
			<Route exact path='/' element={<Navigate to={"/blogs"} />} />
			<Route exact path='/blogs' element={<AllBlogs />} />
			<Route exact path='/signin' element={<Login log={true} />} />
			<Route exact path='/signup' element={<Login />} />
			<Route element={<RequireAuth />}>
				<Route exact path='/blogs/:id' element={<ReadBlog />} />
				<Route exact path='/blogs/new' element={<NewBlog />} />
				<Route exact path='/blogs/authors/:authorId' element={<AllBlogs />} />
				<Route element={<EditAuthority />}>
					<Route exact path='/blogs/:id/edit' element={<EditBlog />} />
				</Route>
			</Route>
			<Route exact path='/error' element={<Error />} />
			<Route exact path='/unauthorized' element={<Unauthorized />} />
			<Route exact path='*' element={<FourOFour />} />
		</Routes>
	)
}

export default Router