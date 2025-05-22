import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import Stepper from './ui/Stepper';
import Calendar from './ui/Calendar';
import Dropdown from './ui/Dropdown';
import Badge from './ui/Badge';
import ErrorMessage from './ui/ErrorMessage';
import Loader from './ui/Loader';
import { getPhoneError, getEmailError, getNameError } from '../utils/validation';
import styles from './BookingForm.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sendBookingRequest, BookingData } from '../services/api.service';

interface BookingFormData {
  date: Date | null;
  time: string;
  duration: string;
  guests: string;
  name: string;
  phone: string;
  email: string;
  comments: string;
}

const steps = [
  {
    id: 'date',
    title: 'Выберите дату',
    description: 'Выберите удобную дату для посещения'
  },
  {
    id: 'time',
    title: 'Выберите время',
    description: 'Выберите удобное время'
  },
  {
    id: 'details',
    title: 'Детали бронирования',
    description: 'Укажите количество гостей и длительность'
  },
  {
    id: 'contact',
    title: 'Контактные данные',
    description: 'Оставьте свои контактные данные'
  }
];

const timeSlots = [
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' }
];

const durationOptions = [
  { value: '2', label: '2 часа' },
  { value: '3', label: '3 часа' },
  { value: '4', label: '4 часа' },
  { value: '5', label: '5 часов' }
];

const guestOptions = [
  { value: '1', label: '1 гость' },
  { value: '2', label: '2 гостя' },
  { value: '3', label: '3 гостя' },
  { value: '4', label: '4 гостя' },
  { value: '5', label: '5 гостей' },
  { value: '6', label: '6 гостей' }
];

const BookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingData>({
    date: new Date().toISOString(),
    time: '',
    duration: '2',
    guests: '2',
    name: '',
    phone: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const methods = useForm<BookingFormData>({
    defaultValues: {
      date: null,
      time: '',
      duration: '',
      guests: '',
      name: '',
      phone: '',
      email: '',
      comments: ''
    },
    mode: 'onChange'
  });

  const { handleSubmit, watch, setValue, formState: { errors } } = methods;
  const selectedDate = watch('date');

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!selectedDate;
      case 1:
        return !!watch('time');
      case 2:
        return !!watch('duration') && !!watch('guests');
      case 3:
        const name = watch('name');
        const phone = watch('phone');
        const email = watch('email');
        return !!(name && phone && email && 
          !getNameError(name) && 
          !getPhoneError(phone) && 
          !getEmailError(email));
      default:
        return true;
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bookingData: BookingData = {
        date: data.date?.toISOString() || new Date().toISOString(),
        time: data.time,
        duration: data.duration,
        guests: data.guests,
        name: data.name,
        phone: data.phone
      };

      await sendBookingRequest(bookingData);
      setSubmitStatus({
        type: 'success',
        message: 'Бронирование успешно отправлено! Мы свяжемся с вами в ближайшее время.'
      });
      methods.reset();
      setCurrentStep(0);
    } catch (error) {
      setSubmitError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date: date.toISOString()
      }));
      setValue('date', date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValue(name as keyof BookingFormData, value);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <div className={styles.calendarWrapper}>
              <DatePicker
                selected={new Date(formData.date)}
                onChange={handleDateChange}
                minDate={new Date()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                dateFormat="dd.MM.yyyy"
              />
            </div>
            {!selectedDate && (
              <ErrorMessage message="Пожалуйста, выберите дату" />
            )}
            <div className={styles.badges}>
              <Badge variant="primary" icon="⭐">
                Более 1000 бронирований
              </Badge>
              <Badge variant="success" icon="✓">
                4.9 на Яндекс.Картах
              </Badge>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <Dropdown
              options={timeSlots}
              value={watch('time')}
              onChange={(value) => setValue('time', value)}
              placeholder="Выберите время"
              error={!watch('time') ? 'Пожалуйста, выберите время' : undefined}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <div className={styles.formGroup}>
              <Dropdown
                options={durationOptions}
                value={watch('duration')}
                onChange={(value) => setValue('duration', value)}
                placeholder="Выберите длительность"
                error={!watch('duration') ? 'Пожалуйста, выберите длительность' : undefined}
              />
            </div>
            <div className={styles.formGroup}>
              <Dropdown
                options={guestOptions}
                value={watch('guests')}
                onChange={(value) => setValue('guests', value)}
                placeholder="Выберите количество гостей"
                error={!watch('guests') ? 'Пожалуйста, выберите количество гостей' : undefined}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Как к вам обращаться?"
                {...methods.register('name', {
                  validate: (value) => {
                    const error = getNameError(value);
                    return error ? error : true;
                  }
                })}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                autoComplete="off"
              />
              <ErrorMessage message={errors.name?.message as string} />
            </div>
            <div className={styles.formGroup}>
              <input
                type="tel"
                placeholder="Телефон"
                {...methods.register('phone', {
                  required: true,
                  validate: (value) => !getPhoneError(value)
                })}
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              />
              <ErrorMessage message={errors.phone?.message as string} />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                {...methods.register('email', {
                  required: true,
                  validate: (value) => !getEmailError(value)
                })}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
              />
              <ErrorMessage message={errors.email?.message as string} />
            </div>
            <div className={styles.formGroup}>
              <textarea
                placeholder="Комментарии (необязательно)"
                {...methods.register('comments')}
                className={styles.textarea}
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.successMessage}
      >
        <h2>Бронирование успешно создано!</h2>
        <p>Мы отправили подтверждение на ваш email.</p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setCurrentStep(0);
          }}
          className={styles.newBookingButton}
        >
          Создать новое бронирование
        </button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {submitError && (
          <ErrorMessage message={submitError} className={styles.submitError} />
        )}

        {submitStatus.type && (
          <div className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className={styles.actions}>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className={styles.backButton}
              disabled={isSubmitting}
            >
              Назад
            </button>
          )}
          <button
            type={currentStep === steps.length - 1 ? 'submit' : 'button'}
            onClick={handleNextStep}
            className={styles.nextButton}
            disabled={isSubmitting || !validateStep(currentStep)}
          >
            {isSubmitting ? (
              <Loader size={20} />
            ) : currentStep === steps.length - 1 ? (
              'Забронировать'
            ) : (
              'Далее'
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BookingForm; 