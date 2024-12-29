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
            <BrowserRouter>
                <Header />
                <Router />
            </BrowserRouter>
        </>
    )
}

export default App
