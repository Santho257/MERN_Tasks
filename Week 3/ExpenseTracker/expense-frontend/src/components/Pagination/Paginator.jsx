import Section from '../../ui/Section/Section';
import Button from '../../ui/Button/Button';
import styles from './Paginator.module.css'
import React from 'react';

const Paginator = ({currentPage, setCurrentPage, totalPages}) => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++){
        pages.push(i);
    }
   
    return (
        <Section className={styles.pages}>
            {pages.map(page => <Button
                key={page}
                active = {(page == currentPage)}
                onClick={() => setCurrentPage(page)}>{page}</Button>)}
        </Section>
    )
}

export default React.memo(Paginator);