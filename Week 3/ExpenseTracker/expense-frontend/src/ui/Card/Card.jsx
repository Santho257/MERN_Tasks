import Section from "../Section/Section";

const Card = ({ children, styles, ...rest }) => {
    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        width: `200px`,
        height: "250px",
        padding: "10px 1%",
        margin: "5px 5px",
        borderRadius: "20px",
        border: "1px solid #8f94fb",
        alignItems: "center",
        ...styles
    }
    return (
        <Section {...rest} style={cardStyles}>
            {children}
        </Section>
    )
}

export const Img = ({ children, src, styles, ...rest }) => {
    const imgStyles = {
        width: "calc(100% - 2px)",
        height: "60%",
        borderRadius: "10px",
        ...styles
    }
    return <img {...rest} style={imgStyles} src={src} alt={rest.alt ?? ""} />
}

export const CardTitle = ({ children, styles, ...rest }) => {
    const titleStyles = {
        margin: "10px 0",
        padding: "5px",
        color: "#4e54c8",
        border: "1px solid grey",
        cursor: "pointer",
        ...styles
    }
    return <h5 {...rest} style={titleStyles}>{children}</h5>
}

export default Card;