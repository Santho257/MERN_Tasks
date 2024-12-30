import { createContext, useCallback, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BASE_URL } from "../constants";

const ThemeContext = createContext(false);

const ThemeContextProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleDarkTheme = useCallback(async () => {
        user.token && await axios.patch(`${BASE_URL}/users`, {theme: darkTheme ? "light" : "dark"},{headers: {Authorization: user.token}});
        setDarkTheme(!darkTheme);
    })
    return <ThemeContext.Provider value={{darkTheme, toggleDarkTheme}}>{children}</ThemeContext.Provider>
}

export {ThemeContext, ThemeContextProvider};