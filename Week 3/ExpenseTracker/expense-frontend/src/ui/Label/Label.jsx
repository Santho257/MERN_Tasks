import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Label = ({ style, htmlFor, children }) => {
  const { darkTheme } = useContext(ThemeContext);
  const labelStyles = {
    position: "absolute",
    fontSize: "0.75rem",
    top: "0.5rem",
    left: "calc(1rem + 5%)",
    zIndex: 1,
    ...style,
    background: darkTheme
      ? "linear-gradient(to bottom, #23282f 0%, #23282f 50%, #333a46 50%, #333a46 100%)"
      : "linear-gradient(to bottom, #f9f9f9 0%, #f9f9f9 50%, #ebecef 50%, #ebecef 100%)"
  };
  return (
    <label style={labelStyles} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default React.memo(Label);
