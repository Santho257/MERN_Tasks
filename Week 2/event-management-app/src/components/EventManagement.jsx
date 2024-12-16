import { useState } from "react";
import './EventManagement.css'
import AttendeesTable from "./AttendeesTable";

const EventManagement = () => {
    const [currentPage, setCurrentPage] = useState(true);
    const [attendees, setAttendees] = useState([]);
    const [user, setUser] = useState({
        email: "",
        name: "",
        age: 5,
        food: "veg",
        attendance: false
    });
    const [err, setErr] = useState({});

    const validateUser = () => {
        setErr({});
        const newErrs = {};
        if (!user.email?.trim() || !user.email.trim().match(/^[a-z0-9\.-]+@([a-z]+\.)+[a-z]{2,4}$/i)) {
            newErrs.email = "Email is required and should be valid";
        }
        if (!user.name?.trim() || !user.name.trim().match(/^[a-zA-Z ]+$/)) {
            newErrs.name = "Name is required and should be valid";
        }
        if (user.age < 5 && user.age > 100) {
            newErrs.age = "Age is required and should be valid & between 5 and 100"
        }
        setErr(newErrs);
        return Object.keys(newErrs).length == 0;
    }

    const registerUser = (e) => {
        e.preventDefault();
        if (validateUser()) {
            setAttendees([...attendees, user]);
            alert("User Registered Successfully");
            setUser({
                email: "",
                name: "",
                age: 5,
                food: "veg",
                attendance: false
            })
        }
        else {
            alert("Not registered")
        }
    }

    return (
        <>
            <header>
                <h3 id="logo">My First Event</h3>
                <nav>
                    <ul>
                        <li className={currentPage ? "selected" : ""} onClick={(e) => setCurrentPage(true)}>Register</li>
                        <li className={!currentPage ? "selected" : ""} onClick={(e) => setCurrentPage(false)}>Attendees</li>
                    </ul>
                </nav>
            </header>
            {(currentPage) ? <section id="formarea">
                <h4 className="title">Register For Event</h4>
                <form onSubmit={registerUser} id="register-form">
                    <article className="inputArea">
                        <label htmlFor="email">Email </label>
                        <input type="email" id="email" value={user.email} onInput={e => {
                            setUser({ ...user, email: e.target.value })
                        }} autoComplete="true" />
                        <sup className="errText">{err.email && err.email}</sup>
                    </article>
                    <article className="inputArea">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="name" value={user.name} onInput={e => {
                            setUser({ ...user, name: e.target.value })
                        }} autoComplete="true" />
                        <sup className="errText">{err.name && err.name}</sup>
                    </article>
                    <article className="inputArea">
                        <label htmlFor="age">Age </label>
                        <input type="number" id="age" min={5} max={100} value={user.age} onInput={e => {
                            setUser({ ...user, age: e.target.value })
                        }} />
                        <sup className="errText">{err.age && err.age}</sup>
                    </article>
                    <article className="inputArea">
                        <label htmlFor="food">Food</label>
                        <select id="food" value={user.food} onChange={e => {
                            setUser({ ...user, food: e.target.value })
                        }}>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non Veg</option>
                        </select>
                        <sup className="errText">{err.food && err.food}</sup>
                    </article>
                    <article className="inputArea">
                        <label htmlFor="attendance">Attendance</label>
                        <input type="checkbox" id="attendance" checked={user.attendance} onChange={e => {
                            setUser({ ...user, attendance: !user.attendance })
                        }} />
                        <sup className="errText">{err.attendance && err.attendance}</sup>
                    </article>
                    <article className="inputArea">
                        <button type="submit" className="submit-btn">Submit</button>
                    </article>
                </form>
            </section> : <>
                <AttendeesTable attendees={attendees} />
            </>}
        </>
    )
}

export default EventManagement