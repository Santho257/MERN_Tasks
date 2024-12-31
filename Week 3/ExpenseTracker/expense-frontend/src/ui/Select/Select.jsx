import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import Section from '../Section/Section';

const Select = ({ style, error, children, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const selectStyles = {
        width: "90%",
        height: "2rem",
        fontSize: "1rem",
        margin: "0 5%",
        borderRadius: "1rem",
        padding: "0 1rem",
        ...style,
        backgroundColor: darkTheme ? "#000000" : "#ffffff",
        color: darkTheme ? "#fff" : "#232323",
        outline: "none",
        border: darkTheme ? "none" : "1px solid #cdcef0"
    }
    const labelStyles = {
        position: "absolute",
        fontSize: "0.75rem",
        top: "0.5rem",
        left: "3rem",
        padding: "auto 1rem",
        backgroundColor: darkTheme ? "#232323" : "#fff"
    }
    const errStyles = {
        color: "red",
        margin: "0 5%",
    }
    return (
        <Section>
            {(rest.value) && <label style={labelStyles} htmlFor={rest.id}>{rest.placeholder || rest.name}</label>}
            <select style={selectStyles} {...rest}>
                {children}
            </select>
            <span style={errStyles}>{error}</span>
        </Section>
    )
}

export const Options = ({ options }) => {
    return Object.entries(options).map(([key, value]) => <option key={value} value={value}>{key}</option>
    )
}

export default Select;