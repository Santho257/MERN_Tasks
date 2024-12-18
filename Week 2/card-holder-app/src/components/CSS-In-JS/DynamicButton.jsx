import { sizes } from "../../utilities/sizeUtility";
import { variants } from "../../utilities/variantUtility";

const DynamicButton = ({ children, size, variant, styles, ...rest }) => {
    const btnStyles = {
        cursor: "pointer",
        margin: "auto 0.25rem",
        border: "none",
        ...styles,
        backgroundColor: variants[variant]?.backgroundColor ?? "white",
        color: variants[variant]?.color ?? "black",
        ...sizes.button[size]
    }
    return <button {...rest} style={btnStyles}>{children}</button>;
}

export default DynamicButton