const FlexWrapper = ({ children, styles, theme, ...props }) => {
    const flexStyles = {
        display: "flex",
        flexWrap: "wrap",
        ...styles,
        justifyContent: styles?.justify ?? "flex-start",
        alignItems: styles?.align ?? "flex-start",
        flexDirection: styles?.direction ?? "row",
        backgroundColor: (theme == "dark") ? "black" : "white",
        color: (theme == "dark") ? "white" : "black",
    }
    return (
        <section {...props} style={flexStyles}>{children}</section>
    )
}

export default FlexWrapper