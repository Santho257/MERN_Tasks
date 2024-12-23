import { createContext, useState } from "react";

const ThemeContext = createContext(false);

const ThemeContextProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false);
    return <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>{children}</ThemeContext.Provider>
}

export {ThemeContext, ThemeContextProvider};