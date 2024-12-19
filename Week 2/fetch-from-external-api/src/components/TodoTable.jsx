import { useEffect, useState } from 'react';
import todo from './todotable.module.css';

const TodoTable = () => {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(result => result.json())
            .then(results => {
                const resultWithName = results.map(async (result) => {
                    return ({
                        id: result.id,
                        title: result.title,
                        completed: result.completed,
                        user: await fetch(`https://jsonplaceholder.typicode.com/users/${result.userId}`)
                            .then(result => result.json())
                            .then(result => { return { id: result.id, name: result.name } })
                    });
                });
                Promise.all([...resultWithName])
                    .then(result => {
                        setTodoList(result);
                        setLoading(false);
                    });
            })
            .catch(err => { setError(err.message) });
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
                                <td className={`${todo.td} ${todo.leftAlign}`}>{item.user.name}</td>
                                <td className={`${todo.td} ${todo.leftAlign}`}>{item.title}</td>
                                <td className={todo.td}>{item.completed ? "Completed" : "To-do"}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
    )
}

export default TodoTable