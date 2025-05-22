import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './Calendar.module.scss';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  minDate,
  maxDate,
  className = ''
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <motion.div
      className={`${styles.calendar} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.header}>
        <button onClick={handlePrevMonth} className={styles.navButton}>
          ←
        </button>
        <h3 className={styles.monthTitle}>
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </h3>
        <button onClick={handleNextMonth} className={styles.navButton}>
          →
        </button>
      </div>

      <div className={styles.weekdays}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);
          const isDisabled = isDateDisabled(day);

          return (
            <motion.button
              key={day.toISOString()}
              className={`
                ${styles.day}
                ${isSelected ? styles.selected : ''}
                ${!isCurrentMonth ? styles.otherMonth : ''}
                ${isCurrentDay ? styles.today : ''}
                ${isDisabled ? styles.disabled : ''}
              `}
              onClick={() => !isDisabled && onSelectDate(day)}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              disabled={isDisabled}
            >
              {format(day, 'd')}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Calendar; 