import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { jwtDecode } from 'jwt-decode';

const EditAuthority = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navi = useNavigate();
    useEffect(() => {
        check();
    },[id, user]);

    const check = async () => {
        try{
            const result = await axios.get(`${BASE_URL}/blogs/${id}`, {headers: {Authorization: `Bearer ${user.token}`}});
            if(jwtDecode(user.token).id != result.data?.data?.author){
                navi("/unauthorized")
            }
        }
        catch(err){
            if(err.response?.data.status == 404){
                navi("/404", {state: {error: err.response?.data?.errors ?? {nf: "Not found"}}});
            }
            navi("/error", {state: {error: err.response?.data?.errors ?? {ue: "Unknown Error"}}});
        }
    }
    return <Outlet/>
}

export default EditAuthority