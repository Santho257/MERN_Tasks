import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(initial);

const AuthContextProvider = ({ children }) => {
    const initial = {
        token: JSON.parse(sessionStorage.getItem("blog-user"))?.token || ""
    }
    const navi = useNavigate();
    const [user, setUser] = useState(initial);

    const login = useCallback(token => {
        sessionStorage.setItem("blog-user", JSON.stringify({ token }));
        setUser({ ...user, token })
    }, [user]);

    const logout = useCallback(() => {
        sessionStorage.setItem("blog-user", JSON.stringify({ token: "" }));
        setUser({ ...initial });
        navi("/blogs")
    }, [user]);

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider };