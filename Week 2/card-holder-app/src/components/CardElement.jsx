const CardElement = ({ children, styles, ...rest }) => {
    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "300px",
        padding: "20px",
        margin: "10px 1%",
        borderRadius: "20px",
        border: "1px solid #8f94fb",
        alignItems: "center",
        ...styles
    }
    return (
        <section {...rest} style={cardStyles}>
            {children}
        </section>
    )
}
export const Img = ({children, src, styles, ...rest}) => {
    const imgStyles = {
        width: "calc(100% - 40px)",
        height: "50%",
        borderRadius: "10px",
        ...styles
    }
    return <img {...rest} style={imgStyles} src={src} alt={rest.alt ?? ""} />
}

export const Title = ({children, styles, ...rest}) => {
    const titleStyles = {
        margin: "20px 0",
        padding: "5px",
        color: "#4e54c8",
        border: "1px solid grey",
        ...styles
    }
    return <h3 {...rest} style={titleStyles}>{children}</h3>
}

export const Description = ({children, styles, ...rest}) => {
    const descStyles = {
        textAlign: "justify",
        ...styles
    }
    return <p {...rest} style={descStyles}>{children}</p>;
}

export default CardElement