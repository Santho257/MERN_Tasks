import styles from './Loading.module.css'

const Loading = () => {
    return (
        <section className={styles.loadingArea}>
            <section className={styles.loaderContainer}>
                <section className={`${styles.loader} ${styles.loader1}`}></section>
                <section className={`${styles.loader} ${styles.loader2}`}></section>
                <section className={`${styles.loader} ${styles.loader3}`}></section>
                <section className={`${styles.loader} ${styles.loader4}`}></section>
            </section>
        </section>
    )
}

export default Loading