import React, { useContext, useEffect, useState } from 'react'
import Section from '../../ui/Section/Section'
import styles from './AllBlogs.module.css'
// import { blogData } from '../../mockData/AllBlogs';
import { BASE_URL } from '../../constants'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AllBlogs = () => {
    const { user } = useContext(AuthContext);
    const { authorId } = useParams();
    const navi = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/blogs${(authorId) ? `/authors/${authorId}` : ""}`, authorId ? {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            } : {});
            setBlogs(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Section className={styles.displayArea}>
            {blogs.map(blog => {
                const shortDesc = blog.content.filter((con) => con.type != "image")
                    .reduce((prev, curr) => prev + curr.value, "").slice(0, 200);

                return <section className={styles.card} key={blog.id} onClick={() => {
                    if(!authorId)   navi(`${blog.id}`)
                    else    navi(`/blogs/${blog.id}`)
                }} >
                    <section className={styles.cardImgArea}>
                        <img className={styles.cardImg} src={blog.displayImage} alt='Display Image' />
                    </section>
                    <section className={styles.cardTextArea}>
                        <h5 className={styles.title}>{blog.title}</h5>
                        <p>{shortDesc}<span>...</span></p>
                    </section>
                </section>
            })}
        </Section>
    )
}

export default AllBlogs