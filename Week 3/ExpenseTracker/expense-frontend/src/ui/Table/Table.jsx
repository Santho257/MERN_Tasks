import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Table = ({ style, children, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);
    const tabStyles = {
        width: "90%",
        margin: "1rem auto",
        border: "1px solid #bfbaba",
        borderCollapse: "collapse",
        textAlign: "center",
        ...style,
        borderColor: darkTheme ? "#454953" : "#e3e4e4",
        backgroundColor: darkTheme ? "#343a46" : "#f6f7f8"
    };
    return (
        <table style={tabStyles} {...rest}>
            {children}
        </table>
    );
};

export const TH = ({ children, style, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext)
    const thStyles = {
        height: "2rem",
        border: "1px solid #aaa1ab",
        padding: "0.5rem 0",
        color: darkTheme ? "#67a9ba" : "#94c8db",
    };
    return (
        <th style={thStyles} {...rest}>
            {children}
        </th>
    );
};
export const TD = ({ children, style, ...rest }) => {
    const tdStyles = {
        height: "2rem",
        border: "1px solid #aaa1ab",
        padding: "0.5rem 0.25rem",
        ...style
    };
    return (
        <td style={tdStyles} {...rest}>
            {children}
        </td>
    );
};

export default Table;
