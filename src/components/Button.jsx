import styles from './Button.module.css'
function Button({onClick, children, type}) {
    return (
        <button onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
}

export default Button
