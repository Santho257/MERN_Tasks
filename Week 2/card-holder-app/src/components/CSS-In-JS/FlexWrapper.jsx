const FlexWrapper = ({ children, ...props }) => {
    const flexStyles = {
        display: "flex",
        flexWrap: "wrap",
        ...props.styles,
        justifyContent: props.styles?.justify ?? "flex-start",
        alignItems: props.styles?.align ?? "flex-start",
        flexDirection: props.styles?.direction ?? "row",
        backgroundColor: (props.theme == "dark") ? "black" : "white",
        color: (props.theme == "dark") ? "white" : "black",
    }
    return (
        <section style={flexStyles}>{children}</section>
    )
}

FlexWrapper.propTypes = {}

export default FlexWrapper