export const phoneRegex = /^\+?[1-9]\d{10,14}$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validatePhone = (value: string): boolean => {
  return phoneRegex.test(value);
};

export const validateEmail = (value: string): boolean => {
  return emailRegex.test(value);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

export const validateMaxLength = (value: string, max: number): boolean => {
  return value.trim().length <= max;
};

export const getPhoneError = (value: string): string | null => {
  if (!value) return 'Телефон обязателен';
  if (!validatePhone(value)) return 'Введите корректный номер телефона';
  return null;
};

export const getEmailError = (value: string): string | null => {
  if (!value) return 'Email обязателен';
  if (!validateEmail(value)) return 'Введите корректный email';
  return null;
};

export const getNameError = (value: string): string | null => {
  if (!value) return 'Имя обязательно';
  if (!validateMinLength(value, 2)) return 'Имя должно содержать минимум 2 символа';
  if (!validateMaxLength(value, 50)) return 'Имя должно содержать максимум 50 символов';
  return null;
}; 