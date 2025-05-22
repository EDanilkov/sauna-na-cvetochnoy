import React from 'react';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
  const menuItems = [
    { name: 'Главная', to: 'home' },
    { name: 'О нас', to: 'about' },
    { name: 'Локация', to: 'locations' },
    { name: 'Услуги', to: 'services' },
    { name: 'Отзывы', to: 'reviews' },
    { name: 'Контакты', to: 'contact' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      )
    },
    {
      name: 'VK',
      url: 'https://vk.com',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.97 14.86 14.94C13.86 14 13.47 13.74 13.24 13.74C12.93 13.74 12.79 13.88 12.79 14.26V15.69C12.79 16.04 12.67 16.27 11.73 16.27C10.25 16.27 8.53 15.31 7.3 13.77C5.39 11.08 4.63 9.79 4.63 9.4C4.63 9.23 4.72 9.06 5.03 9.06H6.49C6.82 9.06 6.98 9.23 7.13 9.58C7.85 11.23 8.79 12.67 9.04 12.67C9.29 12.67 9.38 12.53 9.38 12.06V10.28C9.33 9.23 9.01 9.13 9.01 8.83C9.01 8.65 9.16 8.47 9.38 8.47H11.73C12.04 8.47 12.19 8.65 12.19 8.95V11.5C12.19 11.85 12.34 12.06 12.44 12.06C12.69 12.06 13.04 11.85 13.65 11.27C14.56 10.19 15.09 8.98 15.09 8.75C15.09 8.65 15.19 8.47 15.5 8.47H16.96C17.27 8.47 17.36 8.65 17.27 8.9C17.04 9.58 15.53 11.73 15.53 11.73C15.33 12.06 15.28 12.19 15.53 12.5C15.67 12.67 16.14 13.13 16.5 13.55C17.45 14.64 17.91 15.5 18.04 15.97C18.15 16.27 17.91 16.27 18.15 16.27Z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">На Цветочной</h3>
            <p className="text-gray-400 mb-4">
              Дом с баней «На Цветочной» — уют, современный сервис, русская баня на дровах, бассейн, купель, relax-зона и всё для вашего отдыха и мероприятий.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>ул. Цветочная, д. 11.</li>
              <li>Минский р-н., аг. Ждановичи</li>
              <li>+375 (29) 333-33-33</li>
              <li>info@mail.ru</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Гостевой дом «На Цветочной». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 