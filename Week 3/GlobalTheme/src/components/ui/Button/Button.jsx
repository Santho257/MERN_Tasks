import React, { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'

const Button = ({ children, ...rest }) => {
    const {darkTheme} = useContext(ThemeContext);

    const styles = {
        backgroundColor: darkTheme ? "#414656" : "#ebecf1",
        color: darkTheme ? "#ffffff" : "#3f4147",
        padding: "0.5rem",
        border: "none",
        borderRadius: "1rem"
    }
    return (
        <button style={styles} {...rest}>{children}</button>
    )
}

export default Button