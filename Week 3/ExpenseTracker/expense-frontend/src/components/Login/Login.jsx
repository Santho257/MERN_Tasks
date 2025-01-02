import React, { useCallback, useContext, useState } from "react";
import Section from "../../ui/Section/Section";
import Input from "../../ui/Input/Input";
import styles from "./login.module.css";
import Button from "../../ui/Button/Button";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Title from "../../ui/Title/Title";
import Form from "../../ui/Form/Form";
import EyeClose from "../../ui/Icons/EyeClose";
import EyeOpen from "../../ui/Icons/EyeOpen";

const Login = ({ login }) => {
    const { logIn } = useContext(AuthContext);
    const [visiblePass, setVisiblePass] = useState(false);
    const navi = useNavigate();
    const [errors, setErrors] = useState({ email: "", password: "", name: "" });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const handleChange = useCallback((field, value) => {
        setFormData({ ...formData, [field]: value });
    });
    const handleLogin = async (e) => {
        setErrors({});
        e.preventDefault();
        let result;
        try {
            if (login) {
                result = await axios.post(`${BASE_URL}/auth/login`, formData);
            } else {
                result = await axios.post(`${BASE_URL}/auth/signup`, formData);
            }
            sessionStorage.setItem("user", result.data.data.token);
            logIn(result.data.data.token);
            navi("/expenses");
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };
    return (
        <Section className={styles.container}>
            <Section style={{ width: "540px" }}>
                <Title>{login ? "Login" : "Create Account"}</Title>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="email"
                        error={errors.email}
                    />
                    {!login && (
                        <>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="name"
                            />
                        </>
                    )}
                    <Section style={{ padding: "0" }}>
                        <Input
                            type={visiblePass ? "text" : "password"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="password"
                            error={errors.password}
                        />
                        <span className={styles.visiblePass} onClick={() => setVisiblePass((v) => !v)}>
                            {visiblePass ? <EyeOpen /> : <EyeClose />}
                        </span>
                    </Section>
                    <Button type="submit">{login ? "LOGIN" : "SIGN UP"}</Button>
                </Form>
            </Section>
        </Section>
    );
};

export default Login;
