import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import Section from "../../ui/Section/Section";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ReadBlog = () => {
    const navi = useNavigate();
    const {user} = useContext(AuthContext);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState([]);
    const { id } = useParams();
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/blogs/${id}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ODc2NzdkMDg1Nzk1YmJmNzFkNTI0MyIsInN1YiI6IlRlc3QgVXNlciJ9.N0hVIZ-S4jvaL6k_uN4J1zP6FdPCxcdt7cqkgxreEdY"
                }
            });
            setContent(response.data.data.content);
            setAuthor(response.data.data.author)
            setTitle(response.data.data.title);
        } catch (error) {
            console.log(error);
            if(error.response?.data?.status == 404) navi("/404")
            console.log(error.response.data.errors)

        }
    }

    return (
        <>
            <Section id="blog-area">
                <h3 className="title">{title}</h3>
                {author == jwtDecode(user.token).id && <Link to="edit"><p className="right-align">Edit</p></Link>}
                {content.map((con, i) => (
                    <Section className="content" key={content.id || i}>
                        {con.type == "heading" ? (
                            <h5 className="blog-head">{con.value}</h5>
                        ) : con.type == "para" ? (
                            <p className="blog-para">{con.value}</p>
                        ) : con.type == "quote" ? (
                            <p className="blog-quote">
                                <i>{con.value}</i>
                            </p>
                        ) : (
                            <Section style={{width: "80%"}} className="blog-img">
                                <img src={con.value} alt="It should be an image" />
                            </Section>
                        )}
                    </Section>
                ))}
            </Section>
        </>
    );
};

export default ReadBlog;
