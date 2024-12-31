import { useContext, useState } from 'react'
import Button from '../../../ui/Button/Button'
import Input from '../../../ui/Input/Input'
import AreaStyles from '../ExpenseListArea.module.css'
import axios from 'axios'
import { BASE_URL } from '../../../constants'
import { AuthContext } from '../../../contexts/AuthContext'
const Create = ({ setCount }) => {
    const {user} = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState("")
    const createExpen = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const result = await axios.post(`${BASE_URL}/explists`, { title }, { headers:{Authorization: user.token}});
            console.log(result.data.message)
            setCount(prev => prev + 1);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.errors)
        }
    };
    return (
        <form className={AreaStyles.form} onSubmit={createExpen}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <sub className={AreaStyles.errors}>{errors.title}</sub>
            <Button type="submit">Create</Button>
        </form>
    )
}

export default Create