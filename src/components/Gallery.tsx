import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const images: Image[] = [
    {
      src: '/images/gallery1.jpg',
      alt: 'Интерьер бани'
    },
    {
      src: '/images/gallery2.jpg',
      alt: 'Парная'
    },
    {
      src: '/images/gallery3.jpg',
      alt: 'Зона отдыха'
    },
    {
      src: '/images/gallery4.jpg',
      alt: 'SPA-процедуры'
    },
    {
      src: '/images/gallery5.jpg',
      alt: 'VIP-зона'
    },
    {
      src: '/images/gallery6.jpg',
      alt: 'Массажный кабинет'
    }
  ];

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openLightbox = (image: Image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Галерея</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Погрузитесь в атмосферу нашего комплекса
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery; 