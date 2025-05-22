import React from 'react';
import { motion } from 'framer-motion';
import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  className = '',
  icon
}) => {
  return (
    <motion.span
      className={`${styles.badge} ${styles[variant]} ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </motion.span>
  );
};

export default Badge; 