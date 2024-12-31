import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import Section from '../Section/Section';

const Input = ({ style, error, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const styles = {
        width: "90%",
        height: "2rem",
        fontSize: "1rem",
        margin: "0 5%",
        borderRadius: "1rem",
        padding: "1rem",
        border: "1px solid",
        ...style,
        backgroundColor: darkTheme ? "#000000" : "#ffffff",
        color: darkTheme ? "#fff" : "#232323",
        outline: "none",
        borderColor: error ? "red" : darkTheme ? "transparent" : "#cdcef0",
        
    }
    const labelStyles = {
        position: "absolute",
        fontSize: "0.75rem",
        top: "0.5rem",
        left: "3rem",
        zIndex: 1,
        padding: "0 0.25rem",
        backgroundColor: darkTheme ? "#232323" : "#fff"
    }
    const errStyles= {
        color: "red",
        margin: "0 5%",
    }
    return (
        <Section style={{ position: "relative" }}>
            {(rest.placeholder && !rest.value) || <label style={labelStyles} htmlFor={rest.id}>{rest.placeholder || rest.name}</label>}
            <input style={styles} {...rest} />
            <span style={errStyles}>{error}</span>
        </Section>
    )
}

export default React.memo(Input);