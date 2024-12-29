import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({
        id: sessionStorage.getItem("user")?.jwt || ""
    });
    const logIn = useCallback((token) => {
        setUser({...user, id: jwtDecode(token).id});
    })
    const logOut = useCallback(() => {
        setUser({...user, id: ""});
    })
    return <AuthContext.Provider value={{user, logIn, logOut}}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthContextProvider};