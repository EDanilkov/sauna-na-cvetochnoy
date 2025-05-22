import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ icon, error, label, className, ...props }) => (
  <div className={styles.wrapper}>
    {label && <label className={styles.label}>{label}</label>}
    <div className={styles.inputBox + (icon ? ' ' + styles.withIcon : '')}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles.input + (error ? ' ' + styles.error : '') + (className ? ' ' + className : '')} {...props} />
    </div>
    {error && <div className={styles.errorMsg}>{error}</div>}
  </div>
);

export default Input; 