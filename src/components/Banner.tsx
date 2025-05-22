import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

const images = [
  '/images/gallery1.jpg',
  '/images/gallery2.jpg',
  '/images/gallery3.jpg',
  '/images/gallery4.jpg',
  '/images/gallery5.jpg',
  '/images/gallery6.jpg'
];

const Banner: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setNextImage((currentImage + 1) % images.length);
      setTimeout(() => {
        setCurrentImage((currentImage + 1) % images.length);
      }, 1000);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentImage]);

  const handleSlideChange = (index: number) => {
    if (index === currentImage) return;
    setNextImage(index);
    setTimeout(() => {
      setCurrentImage(index);
    }, 1000);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Sauna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <AnimatePresence mode="wait">
        {nextImage !== currentImage && (
          <motion.div
            key={nextImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={images[nextImage]}
              alt="Sauna"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
          Ваш идеальный отдых за городом
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Дом с баней «На Цветочной» — уют, современный сервис, русская баня на дровах, бассейн и купель для настоящего релакса и мероприятий
        </p>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#b48a5a] to-[#d4af37] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all hover:shadow-xl"
          >
            Подробнее о комплексе
          </motion.button>
        </Link>
      </motion.div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImage === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner; 