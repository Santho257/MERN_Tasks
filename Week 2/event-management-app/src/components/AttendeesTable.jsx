import { useEffect, useState } from 'react'

const AttendeesTable = () => {
    const [filter, setFilter] = useState("");
    const [food, setFood] = useState("");
    const [attendees, setAttendees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        (async () => {
            const newAttendees = (await JSON.parse(localStorage.getItem("attendees"))) ?? [];
            if (filter === "" && food === "") {
                setAttendees(newAttendees);
            }
            else if(filter && food){
                setAttendees(newAttendees.filter(atten => String(atten.attendance) === filter && atten.food == food));
            }
            else if(food){
                setAttendees(newAttendees.filter(atten => atten.food === food));
            }
            else{
                setAttendees(newAttendees.filter(atten => String(atten.attendance) === filter));
            }
        })()
    }, [filter, food]);

    const pages = [];
    const recordPerPage = 10;
    const totalPages = Math.ceil(attendees.length / recordPerPage);
    for(let i = 1; i <= totalPages; i++){
        pages.push(i);
    }
    const start = (Math.min(totalPages, currentPage) - 1) * recordPerPage;
    const end = Math.min(attendees.length, start + recordPerPage);

    return (
        <section id='attendees-area'>
            <section className='head'>
                <h4 className="title">Attendees List</h4>
                <article>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value={""}>All</option>
                        <option value={true}>Present</option>
                        <option value={false}>Absentees</option>
                    </select>
                    <select value={food} onChange={(e) => setFood(e.target.value)}>
                        <option value={""}>All</option>
                        <option value={"veg"}>Veg</option>
                        <option value={"non-veg"}>Non-Veg</option>
                    </select>
                </article>
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
                    {attendees.slice(start, end).map((attendee, i) => <tr key={attendee.email}>
                        <td>{start + i + 1}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.name}</td>
                        <td>{attendee.age}</td>
                        <td>{attendee.food}</td>
                        <td>{attendee.attendance ? "Present" : "Absent"}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <article className='pagination'>
                {pages.map(page => <button
                key={page}
                className={`${(page == currentPage) && "active"}`}
                onClick={() => setCurrentPage(page)}>{page}</button>)}
            </article>
        </section>
    )
}

export default AttendeesTable