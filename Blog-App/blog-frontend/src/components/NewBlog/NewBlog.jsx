import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { BASE_URL } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
    const {user} = useContext(AuthContext);
    const navi = useNavigate();
    useEffect(() => {
        createBlog();
    });
    const createBlog = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/blogs`, {
                title: "", content: [{
                    type: "Para",
                    value: ""
                }]
            }, {headers:{Authorization: `Bearer ${user.token}`}});
            if(response.data?.data?.id){
                navi(`/blogs/${response.data?.data?.id}/edit`)
            }
        } catch (error) {
            console.log("Errors");
        }
    };
    return (
        <></>
    )
}

export default NewBlog