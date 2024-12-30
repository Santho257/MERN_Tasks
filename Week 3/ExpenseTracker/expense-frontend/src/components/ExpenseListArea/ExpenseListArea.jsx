import React, { useContext, useEffect, useState } from 'react'
import Section from '../../ui/Section/Section';
import areaStyles from './ExpenseListArea.module.css'
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import Card, { Img, Title } from '../../ui/Card/Card';
import vite from '/vite.svg'

const ExpenseListArea = () => {
    const { user } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [errors, setErrors] = useState({});
    const [count, setCount] = useState(0);
    useEffect(() => {
        (async () => {
            setErrors({});
            try{
                const result = await axios.get(`${BASE_URL}/explists`, {
                    headers: {
                        Authorization: user.token
                    }
                });
                setExpenses(result?.data?.data);
            }
            catch(error){
                console.log(error)
                setErrors(error.response.data.errors);
            }
        })();
    },[count]);
    return (
        <Section className={areaStyles.container}>
            {expenses.map(expense => {

                return <Card key={expense.id}>
                    <Img src={vite} alt="Temp Img" />
                    <Title>{expense.title}</Title>
                </Card>
            })}
        </Section>
    )
}

export default ExpenseListArea