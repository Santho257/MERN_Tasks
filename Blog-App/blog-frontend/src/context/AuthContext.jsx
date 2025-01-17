import { createContext, useCallback, useState } from "react";

const initial = {
    token: JSON.parse(sessionStorage.getItem("blog-user"))?.token || ""
}

const AuthContext = createContext(initial);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initial);

    const login = useCallback(token => {
        sessionStorage.setItem("blog-user", JSON.stringify({ token }));
        setUser({ ...user, token })
    }, []);

    const logout = useCallback(() => {
        sessionStorage.setItem("blog-user", JSON.stringify({ token: "" }));
        setUser({ ...initial })
    }, []);

    return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthContextProvider};