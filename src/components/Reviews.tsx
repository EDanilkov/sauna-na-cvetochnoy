import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Reviews: React.FC = () => {
  const reviews = [
    {
      name: 'Юлианна Хотянович',
      text: 'Отличная баня, доброжелательная хозяйка. Все чисто, аккуратно. В доме приятная атмосфера, все отлично!',
      rating: 5,
      date: '12.04.2025'
    },
    {
      name: 'Lex Grun',
      text: 'Никогда не был в самой лучшей сауне для мужа и жены! Все на 100% в самом лучшем варианте. ОГРОМНОЕ СПАСИБО ХОЗЯЕВАМ ЭТОГО ЗАВЕДЕНИЯ!',
      rating: 5,
      date: '15.02.2025'
    },
    {
      name: 'Диана Чирич',
      text: 'Лучшая сауна в которой была, ездим даже летом, всегда все супер Ирина просто лучшая.',
      rating: 5,
      date: '20.12.2024'
    },
    {
      name: 'Sangitam Stanilevich',
      text: 'Уже не первый раз здесь. Прекрасное, уютное место. Сразу видно, все сделано с любовью. Внутреннее убранство, отделка, мангал, фотозона - все на высшем уровне. Можно даже встретить котиков, если задержаться подольше :)',
      rating: 5,
      date: '19.02.2024'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Отзывы наших гостей</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Что говорят о нас те, кто уже посетил наш комплекс
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{reviews[currentIndex].name}</h3>
                  <p className="text-gray-600">{reviews[currentIndex].date}</p>
                </div>
                <div className="flex">
                  {renderStars(reviews[currentIndex].rating)}
                </div>
              </div>
              <p className="text-gray-700 text-lg">{reviews[currentIndex].text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevReview}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 