import styles from './Error.module.css'

const Error = ({ error }) => {
    const message = error.error.message ?? error.message;
    console.log(error);
    return (
        <section className={styles.errorContainer}>
            <h1 className={styles.errorText}>{message}</h1>
        </section>
    )
}

export default Error