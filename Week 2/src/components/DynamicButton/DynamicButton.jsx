import { sizes } from "../../utilities/sizeUtility";
import { variants } from "../../utilities/variantUtility";

const DynamicButton = ({ children, size, variant, styles, ...rest }) => {
    const btnStyles = {
        cursor: "pointer",
        border: "none",
        ...styles,
        ...variants[variant],
        ...sizes.button[size]
    }
    return <button {...rest} style={btnStyles}>{children}</button>;
}

export default DynamicButton