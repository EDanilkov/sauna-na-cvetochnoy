import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://sauna-na-cvetochnoy-backend.vercel.app/api';

export interface BookingData {
  date: string;
  time: string;
  duration: string;
  guests: string;
  name: string;
  phone: string;
}

export const sendBookingRequest = async (data: BookingData) => {
  console.log('Frontend: Отправка данных на бэкенд:', data);
  console.log('Frontend: URL запроса:', `${API_URL}/bookings`);
  
  try {
    const response = await axios.post(`${API_URL}/bookings`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Frontend: Получен ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('Frontend: Ошибка при отправке запроса:', error);
    if (axios.isAxiosError(error)) {
      console.error('Frontend: Детали ошибки:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      throw new Error(error.response?.data?.error || 'Failed to send booking request');
    }
    throw error;
  }
}; 