import styles from './Button.module.css';
function Button({ children, action, type }) {
  return (
    <button onClick={action} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
