import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const RequireAuth = () => {
    const auth = useContext(AuthContext);
    if(auth.user.token == ''){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>;
}

export default React.memo(RequireAuth);