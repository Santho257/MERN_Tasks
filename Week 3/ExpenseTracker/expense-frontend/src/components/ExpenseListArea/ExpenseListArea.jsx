import React, { useCallback, useContext, useEffect, useState } from 'react'
import Section from '../../ui/Section/Section';
import areaStyles from './ExpenseListArea.module.css'
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import Card, { CardTitle, Img } from '../../ui/Card/Card';
import explist from '/explist.png'
import Button from '../../ui/Button/Button';
import Create from './Create/Create';
import { useNavigate } from 'react-router-dom';

const ExpenseListArea = () => {
    const navi = useNavigate();
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
                setErrors(error.response.data.errors);
            }
        })();
    }, [count]);

    const deleteExpen = useCallback(async (id) => {
        setErrors({});
        try {
            const result = await axios.delete(`${BASE_URL}/explists/${id}`, { headers: { Authorization: user.token } });
            setCount(prev => prev - 1);
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    });

    const handleCardClick = (e, id) => {
        if (e.target.tagName != 'BUTTON') navi(`${id}`);
        else deleteExpen(id);
    }

    return (
        <Section className={areaStyles.container}>
            <Section className={areaStyles.header}>
                <h3 className={areaStyles.title}>Expense Lists</h3>
                <Create setCount={setCount} />
            </Section>
            <Section className={areaStyles.cardholder}>
                {expenses.map(expense => {
                    return <Card key={expense.id} onClick={(e) => handleCardClick(e, expense._id)}>
                        <Img src={explist} alt="Temp Img" />
                        <CardTitle>{expense.title}</CardTitle>
                        <Button style={{ backgroundColor: "red" }}>Delete</Button>
                    </Card>
                })}
            </Section>
        </Section>
    )
}

export default ExpenseListArea