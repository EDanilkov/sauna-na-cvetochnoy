import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const contactInfo = {
    address: 'Минский р-н., аг. Ждановичи, ул. Цветочная, д. 11.',
    phone: '+375 (29) 123-45-67',
    email: 'info@cvetochnaya.by',
    workingHours: 'Круглосуточно (по предварительной записи)'
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Контакты</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами для бронирования или по любым вопросам — мы всегда на связи!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 md:mb-0">
              <div className="mb-4">
                <span className="font-semibold">Адрес:</span> {contactInfo.address}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Телефон:</span> <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">{contactInfo.phone}</a>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Email:</span> <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">{contactInfo.email}</a>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Время работы:</span> {contactInfo.workingHours}
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[400px] rounded-lg overflow-hidden"
          >
            <div className="relative h-full">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=27.418065%2C53.935935&z=16&pt=27.418065,53.935935,pm2rdm"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title="Sauna Location Yandex Map"
                style={{ position: 'relative', border: 0 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 