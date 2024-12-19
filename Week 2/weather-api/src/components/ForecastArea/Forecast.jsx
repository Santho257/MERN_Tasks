import styles from './Forecast.module.css'

const Forecast = ({ forecast }) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
        <section className={styles.forecast}>
            <section className={styles.title}>
                <h5>Next 3 days Forecast</h5>
            </section>
            <section className={styles.today}>
                <h3 className={styles.heading}>Today</h3>
                <section className={styles.hours}>
                    {(forecast?.forecastday && forecast?.forecastday[0].hour.map((hour) => {
                        return (
                            <section className={`${styles.hour} ${(new Date().getHours() == new Date(hour.time).getHours()) && styles.now}`} key={hour.time}>
                                <p>{(new Date().getHours() == new Date(hour.time).getHours()) ? "now" : new Date(hour.time).getHours().toString().padStart(2, "0").concat(":00")}</p>
                                <img src={hour.condition.icon} />
                                <p style={{ color: "red" }}>{hour.temp_c}<sup>&deg;</sup>C</p>
                            </section>
                        )
                    }))}
                </section>
            </section>
            <section className={styles.twoDays}>
                <section className={styles.day}>
                    <section>
                        <p>{forecast?.forecastday[1] && "Tomorrow"}</p>
                        <p>{forecast?.forecastday[1] && `${new Date(forecast?.forecastday[1].date).getDate()}/${new Date(forecast?.forecastday[1].date).getMonth()}`}</p>
                    </section>
                    <h4>{forecast?.forecastday[1] && forecast?.forecastday[1].day.avgtemp_c}<sup>&deg;</sup>C</h4>
                    {forecast?.forecastday[1] && <img src={forecast?.forecastday[1].day.condition.icon} />}
                </section>
                <section className={styles.day}>
                    <section>
                        <p>{forecast?.forecastday[2] && days[new Date(forecast?.forecastday[2].date).getDay()]}</p>
                        <p>{forecast?.forecastday[2] && `${new Date(forecast?.forecastday[2].date).getDate()}/${new Date(forecast?.forecastday[2].date).getMonth()}`}</p>
                    </section>
                    <h4>{forecast?.forecastday[2] && forecast?.forecastday[2].day.avgtemp_c}<sup>&deg;</sup>C</h4>
                    {forecast?.forecastday[2] && <img src={forecast?.forecastday[2].day.condition.icon} />}
                </section>
            </section>
        </section>
    )
}

export default Forecast