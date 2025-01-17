import React from 'react'
import { useLocation } from 'react-router-dom'
import Section from '../../ui/Section/Section';

const FourOFour = () => {
    const error = useLocation()?.state?.error;
    return (
        <Section>
            {
                (error) ? Object.entries(error)?.map(([key, value]) => (
                    <p key={key}>
                        <b>{key}</b>
                        <span>&nbsp;</span>
                        <span>{value}</span>
                    </p>
                ))
                    : <h2>Page not found in this domain</h2>
            }
        </Section>
    )
}

export default FourOFour