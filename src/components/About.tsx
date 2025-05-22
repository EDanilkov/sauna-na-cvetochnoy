import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const features = [
    {
      title: 'Уют и спокойствие',
      description: 'Гостевой дом с баней «На Цветочной» — это место, где можно отдохнуть от городской суеты, насладиться атмосферой уюта и тишины.'
    },
    {
      title: 'Русская баня на дровах',
      description: 'Настоящая русская баня с ароматным паром, вениками и возможностью попариться по всем традициям.'
    },
    {
      title: 'Бассейн и тёплая купель',
      description: 'Бассейн с гидромассажем, фильтрацией и подогревом воды, а также тёплая купель (чан) на улице для максимального расслабления.'
    },
    {
      title: 'Relax-зона и банкетный зал',
      description: 'Три комнаты отдыха, банкетный зал, современная летняя терраса, relax-обстановка для компаний и семей.'
    },
    {
      title: 'Детская площадка и развлечения',
      description: 'Детская площадка, батут, караоке, ТВ, Wi-Fi, аудио — всё для весёлого и комфортного отдыха.'
    },
    {
      title: 'Кухня и бытовая техника',
      description: 'Кухня, холодильник, чайник, посуда, фен — всё для вашего удобства.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">О нашем комплексе</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Гостевой дом с баней «На Цветочной» — это идеальное место для отдыха, проведения праздников и встреч с друзьями. Здесь сочетаются традиции русской бани, современный комфорт и уютная атмосфера.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 