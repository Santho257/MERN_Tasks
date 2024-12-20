import axios from 'axios';
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../constant';

const DisplayUser = () => {
    const [filter, setFilter] = useState("");
    const [food, setFood] = useState("");
    const [attendees, setAttendees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [apiErr, setApiErr] = useState({});

    useEffect(() => {
        setApiErr({});
        (async () => {
            try{
                const newAttendees = (await axios.get(`${BASE_URL}/users`)).data ?? [];
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
            }
            catch(error){
                console.log(error);
                setApiErr(error);
            }
        })()
    }, [filter, food, count]);

    const markPresent = async (id) => {
        setApiErr({});
        try{
            const result = await axios.patch(`${BASE_URL}/users/${id}`,{
                ...await axios.get(`${BASE_URL}/users/${id}`),
                attendance: true
            });
            if(result.status < 400) setCount(count+1);
        }
        catch(error){
            console.log(error);
            setApiErr(error);
        }
    }

    const deleteUser = async (id) => {
        setApiErr({});
        try{
            const result = await axios.delete(`${BASE_URL}/users/${id}`);
            if(result.status < 400){
                setCount(count+1);
            }
        }
        catch(error){
            console.log(error);
            setApiErr(error);
        }
    }

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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice(start, end).map((attendee, i) => <tr key={attendee.id}>
                        <td>{start + i + 1}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.name}</td>
                        <td>{attendee.age}</td>
                        <td>{attendee.food}</td>
                        <td>{attendee.attendance ? "Present" : <button onClick={() => markPresent(attendee.id)}>Mark Present</button>}</td>
                        <td><button onClick={() => deleteUser(attendee.id)}>Delete</button></td>
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

export default DisplayUser