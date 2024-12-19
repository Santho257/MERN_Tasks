import DetailsArea from "./DetailsArea";
import styles from "./CurrentWeather.module.css";
import ExtraContent from "./ExtraContent";

const CurrentWeather = ({current, location}) => {
    
    return (
        <>
            <section className={styles.mainContent}>
                <DetailsArea weather={{current, location}} />
                <section className={styles.imageArea}>
                    {current && <img src={current.condition.icon} />}
                </section>
            </section>

            <section className={styles.extraDetail}>
                <ExtraContent title="Wind" display="Today wind speed" result={current?.wind_kph} unit="kph" />
                <ExtraContent title="Percipitation" display="Today percipitation" result={current?.precip_mm} unit="mm" />
                <ExtraContent title="Pressure" display="Today's Pressure" result={current?.wind_kph} unit="hpa" />
                <ExtraContent title="UV Index" display="Today UV Index" result={current?.uv} unit="" />
            </section>
        </>
    );
}

export default CurrentWeather