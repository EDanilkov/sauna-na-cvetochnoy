import React from 'react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Русская баня на дровах',
      description: 'Настоящая баня с ароматным паром, вениками и традициями.',
      image: '/images/service-banya.jpg'
    },
    {
      title: 'Бассейн с подогревом',
      description: 'Бассейн 3x2,6 м с гидромассажем, фильтрацией и постоянным подогревом воды.',
      image: '/images/service-pool.jpg'
    },
    {
      title: 'Тёплая купель (чан) на улице',
      description: 'Купель с подогревом на свежем воздухе для максимального релакса.',
      image: '/images/service-kupel.jpg'
    },
    {
      title: 'Relax-зона и банкетный зал',
      description: 'Три комнаты отдыха, банкетный зал, современная летняя терраса.',
      image: '/images/service-relax.jpg'
    },
    {
      title: 'Детская площадка и батут',
      description: 'Безопасная зона для детей, батут, развлечения.',
      image: '/images/service-kids.jpg'
    },
    {
      title: 'Мангал и зона барбекю',
      description: 'Современная летняя терраса, мангал, зона барбекю.',
      image: '/images/service-bbq.jpg'
    },
    {
      title: 'Кухня и бытовая техника',
      description: 'Кухня, холодильник, чайник, посуда, фен — всё для вашего удобства.',
      image: '/images/service-kitchen.jpg'
    },
    {
      title: 'Wi-Fi, ТВ, караоке, аудио',
      description: 'Современные развлечения для вашего отдыха.',
      image: '/images/service-entertainment.jpg'
    }
  ];

  const paid = [
    { title: 'Полотенца', description: 'Выдаются за отдельную плату.' },
    { title: 'Простыни', description: 'Выдаются за отдельную плату.' },
    { title: 'Одноразовые тапочки', description: 'Выдаются за отдельную плату.' },
    { title: 'Веники', description: 'Выдаются за отдельную плату.' }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Всё для вашего комфорта и незабываемого отдыха
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Дополнительно за отдельную плату</h3>
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paid.map((item) => (
              <li key={item.title} className="bg-gray-100 rounded-lg p-6 text-center">
                <span className="block text-lg font-semibold mb-2">{item.title}</span>
                <span className="text-gray-600 text-base">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services; 