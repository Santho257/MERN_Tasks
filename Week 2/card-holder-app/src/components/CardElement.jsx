import React from 'react'

const CardElement = ({ imgSrc, title, description }) => {
    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "300px",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
    }
    const imgStyles = {
        width: "calc(80% - 40px)",
        height: "30%",
        borderRadius: "10px"
    }
    return (
        <section style={cardStyles}>
            <img src={imgSrc} alt='This is an image' />
            <h3>{title}</h3>
            <p>{description}</p>
        </section>
    )
}

export default CardElement