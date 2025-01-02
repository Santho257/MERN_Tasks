import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Button = ({ children, active = false, style, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: active ? "#4e54c8" : darkTheme ? "#58c4dc" : "#2f7ea5",
        color: active ? "white" : darkTheme ? "#2b5669" : "#effefe",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "1rem",
        cursor: "pointer",
        margin: "0 1rem",
        ...style
    }
    return (
        <button style={styles} {...rest}>{children}</button>
    )
}

export default Button