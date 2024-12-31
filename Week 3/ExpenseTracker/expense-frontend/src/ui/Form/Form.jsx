import React from 'react'

const Form = ({ children,style, ...rest }) => {
    const formStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 2rem",
        ...style
    }
    return (
        <form style={formStyles} {...rest}>
            {children}
        </form>
    )
}

export default React.memo(Form);