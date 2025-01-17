const Section = ({ children, style, ...rest }) => {
    const styles = {
        padding: "1rem",
        maxWidth: "1024px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        position: "relative",
        backgroundColor: "#f9f9f9",
        color: "#23282f",
        ...style,
    }
    return (
        <section style={styles} {...rest}>{children}</section>
    )
}

export default Section