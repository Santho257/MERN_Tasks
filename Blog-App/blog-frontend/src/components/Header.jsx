import React, { useContext } from 'react'
import Button from '../ui/Button/Button'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Header = () => {
  const {user, logout} = useContext(AuthContext);
  
  return (
    <header>
        <h3 className='logo'>Own Thoughts</h3>
        <nav>
            <ul>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/blogs/new">Write</Link></li>
                {!user?.token && <li><Link to="/signin"><Button>Sign In</Button></Link></li>}
                {user?.token && <li><Button onClick={logout}>logout</Button></li>}
            </ul>
        </nav>
    </header>
  )
}

export default Header