import { useState } from 'react';
import './App.css';
import RegisterUser from './components/RegisterUser/RegisterUser';
import DisplayUser from './components/DisplayUser/DisplayUser';

const App = () => {
  const [registerPage, setRegisterPage] = useState(true);
  return (
    <>
      <header>
        <h3 id="logo">My First Event</h3>
        <nav>
          <ul>
            <li className={registerPage ? "selected" : ""} onClick={(e) => setRegisterPage(true)}>Register</li>
            <li className={!registerPage ? "selected" : ""} onClick={(e) => setRegisterPage(false)}>Attendees</li>
          </ul>
        </nav>
      </header>
      {(registerPage) ? <RegisterUser /> : <DisplayUser />}
    </>
  )
}

export default App