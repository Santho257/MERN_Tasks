import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './ThemeSetter.module.css';
import Section from '../ui/Section/Section';

const ThemeSetter = () => {
    const {darkTheme, toggleDarkTheme} = useContext(ThemeContext);
    const buttonStyles = {
        backgroundImage: `url(${darkTheme ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnIOipnArAC68qN_3YIkiPV1bd79fPfKSh2w&s" : "https://media.istockphoto.com/id/1324413691/photo/beautiful-sky-with-white-clouds.jpg?s=612x612&w=0&k=20&c=40a8JIoRJ1BAI4XeyEouZl0QbVAJToDBRQn31S3FGzk="})`
    }
    return (
        <Section className={styles.holder}>
            <input style={buttonStyles} className={styles.checkbox} type="checkbox" name="dark" id="dark" checked={darkTheme} onChange={e => toggleDarkTheme(!e.target.checked)} />
        </Section>
    )
}

export default ThemeSetter