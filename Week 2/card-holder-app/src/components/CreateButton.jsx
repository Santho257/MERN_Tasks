import { useState } from "react";
import styles from './createButton.module.css';
import DynamicButton from './CSS-In-JS/DynamicButton'

const CreateButton = () => {
    const [form, setForm] = useState({
        variant: "",
        size: "",
        content: ""
    });
    const [count, setCount] = useState(0);
    const [createdButtons, setCreatedButtons] = useState([]);

    const createButton = e => {
        e.preventDefault();
        setCreatedButtons([...createdButtons, { ...form, count }]);
        setForm({ variant: "", size: "", content: "" });
        setCount(count + 1);
    }

    const handleFormChange = (key, value) => {
        setForm({ ...form, [key]: value });
    }
    return (
        <>
            <form onSubmit={createButton} className={styles.form}>
                <label className={styles.label} htmlFor="variant">Variant</label>
                <select className={styles.select} name="variant" id="variant" value={form.variant} onChange={
                    e => { handleFormChange("variant", e.target.value); }
                }>
                    <option value=""></option>
                    <option value="primary">Primary</option>
                    <option value="dark">Dark</option>
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                </select>
                <label className={styles.label} htmlFor="size">Size</label>
                <select className={styles.select} name="size" id="size" value={form.size} onChange={
                    e => { handleFormChange("size", e.target.value); }
                }>
                    <option value=""></option>
                    <option value="xs">X-Small</option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">X-Large</option>
                    <option value="xxl">2X-Large</option>
                </select>
                <label className={styles.label} htmlFor="content">Content</label>
                <input className={styles.input} type="text" name="content" id="content" value={form.content} onChange={
                    e => { handleFormChange("content", e.target.value); }
                } />
                <DynamicButton className={styles.button} type="submit" variant={"primary"} size={"m"}>Create</DynamicButton>
            </form>
            <ul>
                {
                    createdButtons.map((button) => {
                        return (<li key={button.count}>
                            <DynamicButton className={styles.button} variant={button.variant} size={button.size}>{button.content}</DynamicButton>
                        </li>)
                    })
                }</ul>
        </>
    )
}

export default CreateButton