import React, { useCallback, useState } from 'react'
import Section from '../../ui/Section/Section'
import Input from '../../ui/Input/Input'
import styles from './login.module.css'
import Button from '../../ui/Button/Button'
import axios from 'axios'
import { BASE_URL } from '../../constants'

const Login = ({ login }) => {
    const [errors, setErrors] = useState({email:"", password:""})
    const [formData, setFormData] = useState({
        email: "", password: "", rePassword: ""
    });
    const handleChange = useCallback((field, value) => {
        setFormData({ ...formData, [field]: value })
    });
    const handleLogin = async (e) => {
        setErrors({})
        e.preventDefault();
        let result;
        try{
            if(login){
                result = await axios.post(`${BASE_URL}/auth/login`, formData);
            }
            else{
                result = await axios.post(`${BASE_URL}/auth/signup`, formData);
            }
            sessionStorage.setItem("user", result.data.data);
            alert("success");
        }
        catch(err){
            setErrors(err.response.data.errors)
        }
    };
    return (
        <Section className={styles.container}>
            <Section style={{ width: "540px" }}>
                <h3 className={styles.title}>{login ? "Login" : "Create Account"}</h3>
                <form className={styles.form} onSubmit={handleLogin}>
                    <Input type="email" name="email" id="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="email" error={errors.email}/>
                    <Input type="password" name="password" id="password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="password" error={errors.password}/>
                    {/* {!login && <Input type="password" name="Re-Password" id="Re-Password" value={formData.rePassword} onChange={(e) => handleChange("rePassword", e.target.value)} placeholder="Reenter Password"/>} */}
                    <Button type="submit">{login ? "LOGIN" : "SIGN UP"}</Button>
                </form>
            </Section>
        </Section>
    )
}

export default Login