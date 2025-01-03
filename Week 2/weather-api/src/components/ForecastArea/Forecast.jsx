import { useEffect } from 'react';
import styles from './Forecast.module.css'
import { formatDate } from '../../utils/formatDate';

const Forecast = ({ forecast, time }) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    useEffect(() => {
        document.getElementById("today").scrollTop = document.getElementById("now").offsetTop - document.getElementById("heading").scrollHeight;
    }, [forecast])
    return (
        <section className={styles.forecast}>
            <section className={styles.today} id='today'>
                <h3 className={styles.heading} id='heading'>Today</h3>
                <section className={styles.hours}>
                    {(forecast?.forecastday && forecast?.forecastday[0].hour.map((hour) => {
                        const now = new Date(time).getHours() == new Date(hour.time).getHours();
                        return (
                            <section className={`${styles.hour} ${now && styles.now}`} key={hour.time}id={now ? "now" : ""}>
                                <p>{now ? "now" : new Date(hour.time).getHours().toString().padStart(2, "0").concat(":00")}</p>
                                <img src={hour.condition.icon} />
                                <p>{hour.temp_c}<sup>&deg;</sup>C</p>
                            </section>
                        )
                    }))}
                </section>
            </section>
            <section className={styles.twoDays}>
                <section className={styles.day}>
                    <section>
                        <p>{forecast?.forecastday[1] && "Tomorrow"}</p>
                        <p>{forecast?.forecastday[1] && formatDate(forecast?.forecastday[1].date)}</p>
                    </section>
                    <h4>{forecast?.forecastday[1] && forecast?.forecastday[1].day.avgtemp_c}<sup>&deg;</sup>C</h4>
                    {forecast?.forecastday[1] && <img src={forecast?.forecastday[1].day.condition.icon} />}
                </section>
                <section className={styles.day}>
                    <section>
                        <p>{forecast?.forecastday[2] && days[new Date(forecast?.forecastday[2].date).getDay()]}</p>
                        <p>{forecast?.forecastday[2] && formatDate(forecast?.forecastday[2].date)}</p>
                    </section>
                    <h4>{forecast?.forecastday[2] && forecast?.forecastday[2].day.avgtemp_c}<sup>&deg;</sup>C</h4>
                    {forecast?.forecastday[2] && <img src={forecast?.forecastday[2].day.condition.icon} />}
                </section>
            </section>
        </section>
    )
}

export default Forecast