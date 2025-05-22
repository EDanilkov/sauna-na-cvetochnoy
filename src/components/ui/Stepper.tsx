import React from 'react';
import { motion } from 'framer-motion';
import styles from './Stepper.module.scss';

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = ''
}) => {
  return (
    <div className={`${styles.stepper} ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <React.Fragment key={step.id}>
            <motion.div
              className={`
                ${styles.step}
                ${isCompleted ? styles.completed : ''}
                ${isCurrent ? styles.current : ''}
                ${isUpcoming ? styles.upcoming : ''}
              `}
              onClick={() => onStepClick?.(index)}
              whileHover={onStepClick ? { scale: 1.05 } : {}}
              whileTap={onStepClick ? { scale: 0.95 } : {}}
            >
              <div className={styles.stepContent}>
                <div className={styles.iconWrapper}>
                  {step.icon ? (
                    <span className={styles.icon}>{step.icon}</span>
                  ) : (
                    <span className={styles.number}>{index + 1}</span>
                  )}
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.title}>{step.title}</h3>
                  {step.description && (
                    <p className={styles.description}>{step.description}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <div className={styles.connector}>
                <motion.div
                  className={styles.progress}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isCompleted ? 1 : 0,
                    transformOrigin: 'left'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper; 