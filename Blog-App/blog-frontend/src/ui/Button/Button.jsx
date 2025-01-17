import React from 'react';

const Button = ({ children, active = false, style, ...rest }) => {
    const styles = {
        backgroundColor: active ? "#4e54c8" : "#2f7ea5",
        color: active ? "white" : "#effefe",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "1rem",
        cursor: "pointer",
        ...style
    }
    return (
        <button style={styles} {...rest}>{children}</button>
    )
}

export default React.memo(Button);