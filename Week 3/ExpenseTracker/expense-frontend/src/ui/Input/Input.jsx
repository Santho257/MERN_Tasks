import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import Section from '../Section/Section';
import modStyles from './Input.module.css'

const Input = ({ style, error, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const styles = {
        width: "90%",
        height: "2rem",
        fontSize: "1rem",
        margin: "0 5%",
        borderRadius: "1rem",
        padding: "1rem",
        ...style,
        backgroundColor: darkTheme ? "#000000" : "#ffffff",
        color: darkTheme ? "#fff" : "#232323",
        outline: "none",
        border: darkTheme ? "none" : "1px solid #cdcef0"
    }
    return (
        <Section style={{ position: "relative" }}>
            {(rest.placeholder && !rest.value) || <label htmlFor={rest.id}>{rest.placeholder || rest.name}</label>}
            <input style={styles} {...rest} />
            <span className={modStyles.error}>{error}</span>
        </Section>
    )
}

export default React.memo(Input);