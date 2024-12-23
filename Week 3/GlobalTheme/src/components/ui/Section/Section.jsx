import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'

const Section = ({ children, style, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);

    const styles = {
        padding: "1rem",
        width: "100%",
        ...style,
        backgroundColor: darkTheme ? "#23282f" : "#ffffff",
        color: darkTheme ? "#ffffff" : "#23282f"
    }
    return (
        <section style={styles} {...rest}>{children}</section>
    )
}

export default Section