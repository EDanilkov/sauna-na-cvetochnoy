import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <span
    className={styles.loader}
    style={{ width: size, height: size }}
    aria-label="Загрузка..."
    role="status"
  />
);

export default Loader; 