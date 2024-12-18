const CardElement = ({ children, ...rest }) => {
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
        ...rest.styles
    }
    return (
        <section style={cardStyles}>
            {children}
        </section>
    )
}
export const Img = ({children, src, ...rest}) => {
    const imgStyles = {
        width: "calc(100% - 40px)",
        height: "50%",
        borderRadius: "10px",
        ...rest.styles
    }
    return <img style={imgStyles} src={src} alt={rest.alt ?? ""} />
}

export const Title = ({children, ...rest}) => {
    const titleStyles = {
        margin: "20px 0",
        padding: "5px",
        color: "#4e54c8",
        border: "1px solid grey",
        ...rest.styles
    }
    return <h3 style={titleStyles}>{children}</h3>
}

export const Description = ({children, ...rest}) => {
    const descStyles = {
        textAlign: "justify",
        ...rest.styles
    }
    return <p style={descStyles}>{children}</p>;
}

export default CardElement