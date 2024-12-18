import React from 'react'
import { useLocation } from 'react-router-dom'

const WrongAnswer = () => {
    const { num1, num2, answer } = useLocation().state;
    return (
        <div>{num1} + {num2} = {answer} is WrongAnswer</div>
    )
}

export default WrongAnswer