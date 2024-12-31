import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext';

const InputNS = ({ style, error, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const styles = {
        width: "90%",
        height: "2rem",
        fontSize: "1rem",
        margin: "0 5%",
        padding: "0 1rem",
        border: "1px solid",
        ...style,
        outline: "none",
        borderColor: error ? "red" : "transparent",
        backgroundColor: darkTheme ? "#333a46" : "#ebecef",
        color: darkTheme ? "#fff" : "#232323",
    };
    return (
        <>
            <input style={styles} {...rest} />
        </>
    )
}

export default InputNS