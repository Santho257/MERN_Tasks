import { useContext } from 'react';
import styles from './themesetter.module.css'
import { ThemeContext } from '../../../contexts/ThemeContext';
const ThemeSetter = () => {
  const {darkTheme, toggleDarkTheme} = useContext(ThemeContext);
    const buttonStyles = {
        backgroundImage: `url(${darkTheme ? "https://www.svgrepo.com/show/38147/moon.svg" : "https://www.svgrepo.com/show/513351/sun.svg"})`
    }
  return (
    <input className={styles.checkbox} style={buttonStyles} type="checkbox" name="theme" id="theme" checked={darkTheme} onChange={e => toggleDarkTheme()}/>
  )
}

export default ThemeSetter