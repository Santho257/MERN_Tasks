import styles from './header.module.css'
import {Link, Outlet} from 'react-router-dom'
import ThemeSetter from './ThemeSetter/ThemeSetter'

const Header = () => {
	return (
		<>
		<header className={styles.header}>
			<h2>Expense Tracker</h2>
			<nav>
				<ul>
					<li><Link to="/expenses">Expenses</Link></li>
					<li><Link to="/signup">Signup</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><ThemeSetter/></li>
				</ul>
			</nav>
		</header>
		<Outlet/>
		</>
	)
}

export default Header