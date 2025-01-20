import React, { useEffect, useState } from 'react'
import Section from '../../ui/Section/Section'
import styles from './AllBlogs.module.css'
// import { blogData } from '../../mockData/AllBlogs';
import { BASE_URL } from '../../constants'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AllBlogs = () => {
    const { authorId } = useParams();
    const navi = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/blogs${(authorId) ? `/authors/${authorId}` : ""}`);
            setBlogs(response.data.data);
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    return (
        <Section className={styles.displayArea}>
            {blogs.map(blog => {
                const shortDesc = blog.content.filter((con) => con.type != "image")
                    .reduce((prev, curr) => prev + curr.value, "").slice(0, 200);

                return <section className={styles.card} key={blog.id}>
                    <section className={styles.cardImgArea}>
                        <img className={styles.cardImg} src={blog.displayImage} alt='Display Image' />
                    </section>
                    <section className={styles.cardTextArea}>
                        <h5 onClick={() => navi(`${blog.id}`)} className={styles.title}>{blog.title}</h5>
                        <p>{shortDesc}<span>...</span></p>
                    </section>
                </section>
            })}
        </Section>
    )
}

export default AllBlogs