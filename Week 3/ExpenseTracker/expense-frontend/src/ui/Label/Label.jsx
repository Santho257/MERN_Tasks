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
    padding: "0 0.5rem",
    ...style,
    backgroundColor: darkTheme ? "#232323" : "#fff",
  };
  return (
    <label style={labelStyles} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default React.memo(Label);
