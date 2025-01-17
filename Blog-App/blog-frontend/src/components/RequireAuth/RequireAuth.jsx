import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RequireAuth = () => {
    const {user} = useContext(AuthContext);
    if(user.token == ''){
        return <Navigate to="/signin" replace/>
    }
    return <Outlet/>;
} 

export default React.memo(RequireAuth);