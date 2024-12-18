import React from 'react'

const CardElement = ({ imgSrc, title, description }) => {
    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "300px",
        padding: "20px",
        margin: "10px 1%",
        borderRadius: "10px",
        border: "10px solid green",
        alignItems: "center",
    }
    const imgStyles = {
        width: "calc(100% - 40px)",
        height: "30%",
        borderRadius: "10px"
    }
    const titleStyles = {
        margin: "20px 0",
        padding: "5px",
        color: "green",
        border: "1px solid grey"
    }
    const descStyles = {
        textAlign: "justify",
    }
    return (
        <section style={cardStyles}>
            <img style={imgStyles} src={imgSrc} alt='This is an image' />
            <h3 style={titleStyles}>{title}</h3>
            <p style={descStyles}>{description}</p>
        </section>
    )
}

export default CardElement