import { useContext, useState } from "react";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import AreaStyles from "../ExpenseListArea.module.css";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { AuthContext } from "../../../contexts/AuthContext";
import InputNS from "../../../ui/Input/InputNS";
const Create = ({ setCount }) => {
    const { user } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState("");
    const createExpen = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const result = await axios.post(
                `${BASE_URL}/explists`,
                { title },
                { headers: { Authorization: user.token } }
            );
            setCount((prev) => prev + 1);
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };
    return (
        <form className={AreaStyles.form} onSubmit={createExpen}>
            <InputNS
                value={title}
                error={errors.title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button type="submit">Create</Button>
        </form>
    );
};

export default Create;
