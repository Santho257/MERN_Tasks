import { Link } from 'react-router-dom'
import styles from './Error.module.css'

const Error404 = () => {
    return (
        <section className={styles.errorContainer}>
            <h1 className={styles.errorText}>404! Page Not Found</h1>
            <Link className={styles.errorLink} to={"/"}>Go to Home</Link> 
        </section>
    )
}

export default Error404;