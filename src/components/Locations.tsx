import React from 'react';
import { motion } from 'framer-motion';

const Locations: React.FC = () => {
  const locations = [
    {
      name: 'Дом с баней «На Цветочной»',
      address: 'Минский р-н., аг. Ждановичи, ул. Цветочная, д. 11.',
      description: 'Гостевой дом с баней, бассейном, тёплой купелью, современной летней террасой, банкетным залом, relax-зоной, детской площадкой, мангалом и зоной барбекю. Всё для вашего отдыха и мероприятий.',
      image: '/images/location1.jpg'
    }
  ];

  return (
    <section id="locations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Наша локация</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Просторная территория с ландшафтным дизайном, бассейном, купелью, террасой, детской площадкой и всеми удобствами для вашего отдыха.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-1 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-2">{location.address}</p>
                <p className="text-gray-700">{location.description}</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                  Забронировать
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations; 