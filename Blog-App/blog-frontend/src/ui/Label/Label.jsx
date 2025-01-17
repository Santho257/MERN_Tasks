import React, { useContext } from "react";

const Label = ({ style, htmlFor, children }) => {
  const labelStyles = {
    position: "absolute",
    fontSize: "0.75rem",
    top: "0.5rem",
    left: "calc(1rem + 5%)",
    zIndex: 1,
    background: "linear-gradient(to bottom, #f9f9f9 0%, #f9f9f9 50%, #ebecef 50%, #ebecef 100%)",
    ...style,
  };
  return (
    <label style={labelStyles} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default React.memo(Label);
