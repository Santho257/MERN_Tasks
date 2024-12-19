import styles from './CurrentWeather.module.css'

const ExtraContent = ({title, display, result, unit}) => {
    return (
        <section className={styles.extraContent}>
            <h5>{title}</h5>
            <p>{display}</p>
            <h5>{result}{unit}</h5>
        </section>
    )
}

export default ExtraContent