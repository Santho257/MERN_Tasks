import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import Section from '../Section/Section';
import Label from '../Label/Label';

const Select = ({ style, noLabel, error, children, ...rest }) => {
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
    const errStyles = {
        color: "red",
        margin: "0 5%",
    }
    return (
        <Section>
            {(rest.value && !noLabel) && <Label htmlFor={rest.id}>{rest.placeholder || rest.name}</Label>}
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