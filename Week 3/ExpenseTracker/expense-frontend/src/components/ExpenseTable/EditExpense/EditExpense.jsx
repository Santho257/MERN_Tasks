import React, { useCallback, useContext, useEffect, useState } from 'react';
import Input from '../../../ui/Input/Input';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import Section from '../../../ui/Section/Section';
import { BASE_URL } from '../../../constants';
import Select, { Options } from '../../../ui/Select/Select';
import Button from '../../../ui/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../../ui/Form/Form';
import Title from '../../../ui/Title/Title';
import styles from './EditExpense.module.css'
import { useFetch } from '../../../hooks/useFetch';

const EditExpense = () => {
    const navi = useNavigate();
    const { expId } = useParams();
    const { user } = useContext(AuthContext);
    const initial = { source: "", category: "", amount: "", date: "" }

    const [formdata, setFormdata, errors, setErrors] = useFetch(`${BASE_URL}/expenses/${expId}`, { Authorization: user.token }, initial);

    const category = {
        Category: "",
        Food: "food",
        Travel: "travel",
        Personal: "personal",
        Family: "family"
    }

    const handleFieldChange = useCallback((field, value) => {
        setFormdata({ ...formdata, [field]: value })
    }, [formdata]);

    const entryExpense = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.patch(`${BASE_URL}/expenses/${expId}`, formdata, { headers: { Authorization: user.token } });
            if(result.data.success)
                navi(-1);

        } catch (error) {
            setErrors(error?.response?.data?.errors || { message: error.message })
        }
    }
    return (
        <Section className={styles.container}>
            <Section>
                <Title>Edit Expense</Title>
                <Form onSubmit={entryExpense}>
                    <Input type="text" name="source" id="source" label="source" value={formdata.source} onChange={(e) => handleFieldChange("source", e.target.value)} error={errors.source} placeholder="Source" />
                    <Select name="category" id="category" label="category" onChange={(e) => handleFieldChange("category", e.target.value)} error={errors?.category} value={formdata.category.toLowerCase()} placeholder="Category">
                        <Options options={category} />
                    </Select>
                    <Input type="date" name="date" id="date" label="Date" value={formdata?.date?.slice(0, 10)} onChange={(e) => handleFieldChange("date", e.target.value)} error={errors.date} placeholder="Date" />
                    <Input type="number" name="amount" id="amount" label="Amount" value={formdata.amount} onChange={(e) => handleFieldChange("amount", e.target.value)} error={errors.amount} placeholder="Amount" />
                    <Button type="submit">Edit Expense</Button>
                </Form>
            </Section>
        </Section>
    )
}

export default React.memo(EditExpense)