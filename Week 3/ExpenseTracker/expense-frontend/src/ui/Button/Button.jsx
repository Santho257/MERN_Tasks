import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Button = ({ children, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: darkTheme ? "#58c4dc" : "#2f7ea5",
        color: darkTheme ? "#2b5669" : "#effefe",
        padding: "0.5rem",
        border: "none",
        borderRadius: "1rem",
        cursor: "pointer"
    }
    return (
        <button style={styles} {...rest}>{children}</button>
    )
}

export default Button