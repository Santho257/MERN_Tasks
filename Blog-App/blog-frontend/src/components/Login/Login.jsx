import React, { useCallback, useContext, useState } from "react";
import Section from "../../ui/Section/Section";
import Input from "../../ui/Input/Input";
import styles from "./login.module.css";
import Button from "../../ui/Button/Button";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../ui/Form/Form";
import EyeClose from "../../ui/Icons/EyeClose";
import EyeOpen from "../../ui/Icons/EyeOpen";

const Login = ({ log }) => {
    const { login } = useContext(AuthContext);
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
            if (log) {
                result = await axios.post(`${BASE_URL}/auth/login`, formData);
            } else {
                result = await axios.post(`${BASE_URL}/auth/signup`, formData);
            }
            login(result.data.data.token);
            navi("/blogs");
        } catch (err) {
            console.log(err.response)
            setErrors(err.response.data.errors);
        }
    };
    return (
        <Section className={styles.container}>
            <Section style={{ width: "540px", background: "white" }} className={styles.holder}>
                <h3 className="title">{log ? "Login" : "Create Account"}</h3>
                <Form onSubmit={handleLogin} style={{ background: "white" }} className={styles.formArea}>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="email"
                        error={errors?.email}
                    />
                    {!log && (
                        <>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="name"
                                error={errors?.name}
                            />
                        </>
                    )}
                    <Section style={{ padding: 0, marginBottom: "1rem" }}>
                        <Input
                            type={visiblePass ? "text" : "password"}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="password"
                            error={errors?.password}
                        />
                        <span className={styles.visiblePass} onClick={() => setVisiblePass((v) => !v)}>
                            {visiblePass ? <EyeOpen /> : <EyeClose />}
                        </span>
                    </Section>
                    <Button type="submit">{log ? "LOGIN" : "SIGN UP"}</Button>
                    <section className={styles.switch}>
                        <span className={styles.switchSpan}>{log ? "Create Account" : "Already have an account"}</span>
                        <Link to={log ? "/signup" : "/signin"} className={styles.link}>{log ? "signup" : "signin"}</Link>
                    </section>
                </Form>
            </Section>
        </Section>
    );
};

export default Login;
