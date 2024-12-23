import { useEffect, useState } from 'react';
import todo from './todotable.module.css';

const TodoTable = () => {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState({});

    useEffect(() => {
        (async () => {
            const result = await fetch("https://jsonplaceholder.typicode.com/todos");
            const todo = await result.json();
            if(result.ok) setTodoList(todo);
            const userSet = new Set();
            for (let res of todo) {
                userSet.add(res.userId);
            }
            for (let usr of Array.from(userSet)) {
                const result = await fetch(`https://jsonplaceholder.typicode.com/users/${usr}`);
                const user = await result.json();
                setUsers(prev => { return { ...prev, [user.id]: user.name } })
            }
            setLoading(false);
        })()
    }, []);

    return (
        error
            ? <em>{error}</em>
            : loading
                ? <p>Loading</p>
                : <table className={todo.table}>
                    <thead className={todo.thead}>
                        <tr>
                            <th className={todo.th}>S.No</th>
                            <th className={todo.th}>Username</th>
                            <th className={todo.th}>Title</th>
                            <th className={todo.th}>Completed</th>
                        </tr>
                    </thead>
                    <tbody className={todo.tbody}>
                        {todoList.map((item, i) => {
                            return (<tr key={item.id}>
                                <td className={todo.td}>{i + 1}</td>
                                <td className={`${todo.td} ${todo.leftAlign}`}>{users[item.userId]}</td>
                                <td className={`${todo.td} ${todo.leftAlign}`}>{item.title}</td>
                                <td className={todo.td}>{item.completed ? "Completed" : "To-do"}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
    )
}

export default TodoTable