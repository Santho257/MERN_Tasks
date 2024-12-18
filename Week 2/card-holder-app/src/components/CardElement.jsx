import cardStyles from './CardElement.module.css'

const CardElement = ({ imgSrc, title, description }) => {
    return (
        <section className={cardStyles.card}>
            <img src={imgSrc} alt='This is an image' className={cardStyles.cardImg}/>
            <h3 className={cardStyles.cardTitle}>{title}</h3>
            <p className={cardStyles.cardDescription}>{description}</p>
        </section>
    )
}

export default CardElement