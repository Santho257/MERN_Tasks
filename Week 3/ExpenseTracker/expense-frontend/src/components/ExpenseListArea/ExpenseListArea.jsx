import React, { useCallback, useContext, useEffect, useState } from 'react'
import Section from '../../ui/Section/Section';
import areaStyles from './ExpenseListArea.module.css'
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import Card, { Img, Title } from '../../ui/Card/Card';
import vite from '/vite.svg'
import Button from '../../ui/Button/Button';
import Create from './Create/Create';

const ExpenseListArea = () => {
    const { user } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [errors, setErrors] = useState({});
    const [count, setCount] = useState(0);
    useEffect(() => {
        (async () => {
            setErrors({});
            try {
                const result = await axios.get(`${BASE_URL}/explists`, {
                    headers: {
                        Authorization: user.token
                    }
                });
                setExpenses(result?.data?.data);
            }
            catch (error) {
                console.log(error)
                setErrors(error.response.data.errors);
            }
        })();
    }, [count]);

    const createExpen = useCallback(async (e, title) => {
        e.preventDefault();
        setErrors({});
        try {
            const result = await axios.post(`${BASE_URL}/explists`, { title }, { headers:{Authorization: user.token}});
            console.log(result.data.message)
            setCount(prev => prev + 1);
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    });

    const deleteExpen = useCallback(async (id) => {
        setErrors({});
        try {
            const result = await axios.delete(`${BASE_URL}/explists/${id}`, { headers:{Authorization: user.token}});
            setCount(prev => prev - 1);
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    });

    return (
        <Section className={areaStyles.container}>
            <Section className={areaStyles.header}>
                <h3 className={areaStyles.title}>Expense Lists</h3>
                <Create createFunc={createExpen} />
            </Section>
            <Section className={areaStyles.cardholder}>
                {expenses.map(expense => {
                    return <Card key={expense.id}>
                        <Img src={vite} alt="Temp Img" />
                        <Title>{expense.title}</Title>
                        <Button onClick={e => deleteExpen(expense._id)}>Delete</Button>
                    </Card>
                })}
            </Section>
        </Section>
    )
}

export default ExpenseListArea