import { useState } from 'react';
import CardElement, { Description, Img, Title } from './CardElement';
import styles from './CreateCard.module.css';
import FlexWrapper from './CSS-In-JS/FlexWrapper.jsx'
import DynamicButton from './CSS-In-JS/DynamicButton.jsx';

const CreateCard = () => {
    const [form, setForm] = useState({
        img: { name: "", blob: "" },
        title: "",
        description: ""
    });
    const [error, setError] = useState({ title: "", img: "" })
    const [count, setCount] = useState(0);
    const [createdCards, setCreatedCards] = useState([]);

    const createCard = e => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError({ title: "Title is required" });
            return;
        }
        if (!form.img.name || !form.img.blob) {
            setError({ img: "Image is required" })
            return;
        }
        setCreatedCards([...createdCards, { ...form, count }]);
        setForm({ img: "", title: "", description: "" });
        setCount(count + 1);
    }
    const handleFormChange = (key, value) => {
        setForm({ ...form, [key]: value });
    }
    const handleImageChange = e => {
        const reader = new FileReader();
        if (e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
        else {
            setForm({
                ...form, "img": {
                    name: "",
                    blob: ""
                }
            });
            return;
        }
        reader.addEventListener("load", () => {
            setForm({
                ...form, "img": {
                    name: e.target.files[0].name,
                    blob: reader.result
                }
            });
        });
    }
    return (
        <section>
            <h2 className={styles.title}>Create Card</h2>
            <form onSubmit={createCard} className={styles.form} encType='multipart/formdata'>
                <label className={styles.label} htmlFor="title">Title</label>
                <sup style={{ color: "red" }}>{error.title}</sup>
                <input className={styles.input} type="text" name="title" id="title" value={form.title} onChange={
                    e => { handleFormChange("title", e.target.value); }
                } />
                <label className={styles.label} htmlFor="description">Description</label>
                <textarea className={styles.input} name="description" id="description" value={form.description} onChange={
                    e => { handleFormChange("description", e.target.value); }
                } ></textarea>
                <label className={styles.label} htmlFor="img">Img</label>
                <sup style={{ color: "red" }}>{error.img}</sup>
                <input className={styles.input} type="file" accept='image/*' name="img" id="img" onChange={handleImageChange} />
                <sub style={{ marginLeft: "10%" }}>{form.img.name ?? ""}</sub>
                <DynamicButton className={styles.button} type="submit" variant={"primary"} size={"m"}>Create</DynamicButton>
            </form>
            <FlexWrapper styles={{margin: "auto 2rem"}}>
                {
                    createdCards.map((card) => {
                        return (
                            <CardElement key={card.count}>
                                <Img src={card.img.blob} />
                                <Title>{card.title}</Title>
                                <Description>{card.description}</Description>
                            </CardElement>)
                    })
                }
            </FlexWrapper>
        </section>
    )
}

export default CreateCard