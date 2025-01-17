import React, { useEffect, useState } from 'react'
import Section from '../../ui/Section/Section'
import styles from './AllBlogs.module.css'
import { blogData } from '../../mockData/AllBlogs';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
    const navi = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        setBlogs(blogData);
    },[])

    return (
        <Section className={styles.displayArea}>
            {blogs.map(blog => {
                const shortDesc = blog.content.filter((con) => con.type != "image")
                .reduce((prev, curr) => prev + curr.value, "").slice(0,200);

                return <section className={styles.card}>
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