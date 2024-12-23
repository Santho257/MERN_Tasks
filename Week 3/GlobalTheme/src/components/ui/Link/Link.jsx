import React, { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'

const Link = ({ href, children, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);

    const style = {
        color: darkTheme ? "#6bafbf" : "#34748f",
        textDecoration: "none",
        fontWeight: 600
    }
    return (
        <a href={href} style={style} target='_blank' {...rest}> {children} </a>
    )
}

export default Link