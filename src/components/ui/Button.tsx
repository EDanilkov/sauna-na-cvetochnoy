import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, variant = 'primary', children, ...props }) => (
  <button
    className={[
      styles.button,
      styles[variant],
      loading ? styles.loading : '',
      props.disabled ? styles.disabled : '',
    ].join(' ')}
    disabled={props.disabled || loading}
    {...props}
  >
    {loading && <span className={styles.loader} />}
    <span className={styles.text}>{children}</span>
  </button>
);

export default Button; 