import { useState } from "react";
import './EventManagement.css'
import AttendeesTable from "./AttendeesTable";
import RegisterForm from "./RegisterForm";

const EventManagement = () => {
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
            {(registerPage) ? <RegisterForm /> : <AttendeesTable />}
        </>
    )
}

export default EventManagement