import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext';

const SelectNS = ({ style, error, children, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const selectStyles = {
        width: "90%",
        height: "2rem",
        fontSize: "1rem",
        margin: "0 5%",
        padding: "0 1rem",
        border: "1px solid",
        ...style,
        backgroundColor: darkTheme ? "#000000" : "#ffffff",
        color: darkTheme ? "#fff" : "#232323",
        outline: "none",
        borderColor: error ? "red" : darkTheme ? "transparent" : "#cdcef0",
    };
    return (
        <select style={selectStyles} {...rest}>
            {children}
        </select>
    )
}

export default SelectNS;