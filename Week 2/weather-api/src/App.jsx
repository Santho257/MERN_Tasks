import CurrentWeather from "./components/CurrentWeather/CurrentWeather"
import styles from './App.module.css';
const App = () => {
    return (
        <section className={styles.flexArea}>
            <CurrentWeather />
        </section>
    )
}

export default App