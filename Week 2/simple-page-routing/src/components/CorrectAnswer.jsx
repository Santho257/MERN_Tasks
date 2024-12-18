import React from 'react'
import { useLocation } from 'react-router-dom'

const CorrectAnswer = () => {
    const { num1, num2, answer } = useLocation().state;
    return (
        <div>{num1} + {num2} = {answer} is CorrectAnswer</div>
    )
}

export default CorrectAnswer