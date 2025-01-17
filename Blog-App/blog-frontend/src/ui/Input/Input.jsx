import React from "react";
import Section from "../Section/Section";
import Label from "../Label/Label";

const Input = ({ style, error, noLabel, ...rest }) => {
  const styles = {
    width: "90%",
    height: "2rem",
    fontSize: "1rem",
    margin: "0 5%",
    padding: "1rem",
    border: "1px solid transparent",
    outline: "none",
    borderColor: error ? "red" : "transparent",
    backgroundColor: "#ebecef",
    color: "#232323",
    ...style,
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
