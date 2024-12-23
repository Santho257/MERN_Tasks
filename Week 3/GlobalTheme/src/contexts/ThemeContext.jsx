import { createContext, useCallback, useState } from "react";

const ThemeContext = createContext(false);

const ThemeContextProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleDarkTheme = useCallback(() => {
        setDarkTheme(!darkTheme);
    })
    return <ThemeContext.Provider value={{darkTheme, toggleDarkTheme}}>{children}</ThemeContext.Provider>
}

export {ThemeContext, ThemeContextProvider};