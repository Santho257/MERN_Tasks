import styles from './header.module.css'
import {Link, Outlet} from 'react-router-dom'
import ThemeSetter from './ThemeSetter/ThemeSetter'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const Header = () => {
	const {user, logOut} = useContext(AuthContext);
	return (
		<>
		<header className={styles.header}>
			<h2>Expense Tracker</h2>
			<nav>
				<ul>
					<li>{user.id}</li>
					{user.id && <li><Link to="/expenses">Expenses</Link></li>}
					{!user.id && <li><Link to="/signup">Signup</Link></li>}
					{!user.id && <li><Link to="/login">Login</Link></li>}
					{user.id && <li onClick={logOut}>Logout</li>}
					<li><ThemeSetter/></li>
				</ul>
			</nav>
		</header>
		<Outlet/>
		</>
	)
}

export default Header