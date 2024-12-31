import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Section from "../Section/Section";
import Label from "../Label/Label";

const Input = ({ style, error, noLabel, ...rest }) => {
  const { darkTheme } = useContext(ThemeContext);
  const styles = {
    width: "90%",
    height: "2rem",
    fontSize: "1rem",
    margin: "0 5%",
    padding: "1rem",
    border: "1px solid transparent",
    ...style,
    outline: "none",
    borderColor: error ? "red" : "transparent",
    backgroundColor: darkTheme ? "#333a46" : "#ebecef",
    color: darkTheme ? "#fff" : "#232323",
  };
  const errStyles = {
    color: "red",
    margin: "0 5%",
  };
  return (
    <Section style={{ position: "relative" }}>
      {rest.value && !noLabel && (
        <Label htmlFor={rest.id}>{rest.placeholder || rest.name}</Label>
      )}
      <input style={styles} {...rest} />
      <span style={errStyles}>{error}</span>
    </Section>
  );
};

export default React.memo(Input);
