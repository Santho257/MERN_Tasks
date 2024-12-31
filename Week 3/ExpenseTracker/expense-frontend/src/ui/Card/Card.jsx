import { useContext } from "react";
import Section from "../Section/Section";
import { ThemeContext } from "../../contexts/ThemeContext";

const Card = ({ children, styles, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        width: `200px`,
        height: "250px",
        padding: "10px 1%",
        margin: "5px 5px",
        borderRadius: "20px",
        border: "1px solid #e3e4e4",
        alignItems: "center",
        ...styles,
        borderColor: darkTheme ? "#454953" : "#e3e4e4",
        backgroundColor: darkTheme ? "#343a46" : "#f6f7f8"
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
    const { darkTheme } = useContext(ThemeContext);
    const titleStyles = {
        margin: "10px 0",
        padding: "5px",
        cursor: "pointer",
        ...styles,
        color: darkTheme ? "#67a9ba" : "#94c8db",
    }
    return <h5 {...rest} style={titleStyles}>{children}</h5>
}

export default Card;