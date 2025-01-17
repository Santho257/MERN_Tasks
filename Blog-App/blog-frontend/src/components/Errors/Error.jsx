import React from 'react'
import { useLocation } from 'react-router-dom'
import Section from '../../ui/Section/Section';

const Error = () => {
    const { error } = useLocation().state;
    return (
        <Section>
            {
                Object.entries(error).map(([key, value]) => (
                    <p key={key}>
                        <b>{key}</b>
                        <span>&nbsp;</span>
                        <span>{value}</span>
                    </p>
                ))
            }
        </Section>
    )
}

export default Error