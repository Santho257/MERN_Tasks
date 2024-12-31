import React from 'react'

const Title = ({ as, children, style,...rest }) => {
    const titleStyles = {
        width: "100%",
        textAlign: "center",
        ...style
    }
    const Tag = as || 'h3';
    return (
        <Tag style={titleStyles} {...rest}>{children}</Tag>
    )
}

export default Title