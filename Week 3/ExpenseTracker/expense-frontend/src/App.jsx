import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import Router from "./components/Routes/Router"
import { ThemeContext } from "./contexts/ThemeContext"
import { useContext, useEffect } from "react"

const App = () => {
    const { darkTheme } = useContext(ThemeContext);
    useEffect(() => {
        document.body.style.backgroundColor = darkTheme ? "black" : "white";
    }, [darkTheme])
    return (
        <>
            <Header />
            <Router />
        </>
    )
}

export default App
