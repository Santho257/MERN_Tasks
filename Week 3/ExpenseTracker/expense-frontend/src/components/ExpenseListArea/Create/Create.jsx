import { useState } from 'react'
import Button from '../../../ui/Button/Button'
import Input from '../../../ui/Input/Input'
import AreaStyles from '../ExpenseListArea.module.css'
const Create = ({ createFunc }) => {
    const [title, setTitle] = useState("")
    return (
        <form className={AreaStyles.form} onSubmit={e => createFunc(e, title)}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Button type="submit">Create</Button>
        </form>
    )
}

export default Create