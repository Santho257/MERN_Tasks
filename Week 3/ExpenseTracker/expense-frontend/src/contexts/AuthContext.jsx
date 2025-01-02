import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navi = useNavigate();
    const [user, setUser] = useState({
        token: sessionStorage.getItem("user") || ""
    });
    const logIn = useCallback(token => {
        setUser({ ...user, token });
    });
    const logOut = useCallback(() => {
        sessionStorage.setItem("user", "");
        setUser({ ...user, token: "" });
        navi("/login")
    });
    return <AuthContext.Provider value={{ user, logIn, logOut }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider };