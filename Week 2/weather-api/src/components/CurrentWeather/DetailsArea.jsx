import Humidity from '../ui/icons/Humidity'
import Pressure from '../ui/icons/Pressure'
import Wind from '../ui/icons/Wind'
import styles from './DetailsArea.module.css'
const DetailsArea = ({ weather }) => {
    return (
        <section className={styles.detailsArea}>
            <section className={styles.locationDetails}>
                <h6>{weather?.location?.name}<span>,{weather?.location?.country}</span></h6>
                <p>{weather?.location?.localtime}</p>
            </section>
            <section className={styles.tempDetails}>
                <h1>{weather?.current?.temp_c}<sup>&deg;</sup><sub>{"C"}</sub></h1>
                <p>{weather?.current?.condition?.text}</p>
            </section>
            <section className={styles.otherDetails}>
                <section>
                    <Pressure />
                    <p>{weather?.current?.pressure_mb}hpa</p>
                </section>
                <section>
                    <Humidity />
                    <p>{weather?.current?.humidity}%</p>
                </section>
                <section>
                    <Wind />
                    <p>{weather?.current?.wind_kph}kph</p>
                </section>
            </section>
        </section>
    )
}

export default DetailsArea