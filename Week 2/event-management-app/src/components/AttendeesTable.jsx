import { useState } from 'react'

const AttendeesTable = ({ attendees }) => {
    const [filter, setFilter] = useState("");
    return (
        <section id='attendees-area'>
            <section className='head'>
                <h4 className="title">Attendees List</h4>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value={""}>All</option>
                    <option value={false}>Absentees</option>
                    <option value={true}>Present</option>
                </select>
            </section>
            <table>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Food Preference</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.filter(attendee => {
                        return (filter === "") ? true
                            : (filter == "true") ? attendee.attendance == true
                                : attendee.attendance == false;
                    }).map((attendee, i) => <tr key={attendee.email}>
                        <td>{i + 1}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.name}</td>
                        <td>{attendee.age}</td>
                        <td>{attendee.food}</td>
                        <td>{attendee.attendance ? "Present" : "Absent"}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default AttendeesTable