import React from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  const menuItems = [
    { label: 'Главная', to: 'banner' },
    { label: 'О нас', to: 'about' },
    { label: 'Локации', to: 'locations' },
    { label: 'Услуги', to: 'services' },
    { label: 'Отзывы', to: 'reviews' },
    { label: 'Галерея', to: 'gallery' },
    { label: 'Контакты', to: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold tracking-widest text-[#e7dfc7]">VOLKI</div>
        <nav className="hidden md:flex space-x-8">
          {menuItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="cursor-pointer text-[#e7dfc7] hover:text-[#b6b09a] transition text-lg font-medium"
              activeClass="text-[#5e7c6a]"
              spy={true}
              offset={-80}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <RouterLink
            to="/booking"
            className="px-6 py-2 rounded-2xl bg-[#e7dfc7] text-[#2d4c3b] font-semibold text-lg shadow hover:bg-[#d6ceb6] transition"
          >
            ЗАБРОНИРОВАТЬ
          </RouterLink>
        </div>
      </div>
    </header>
  );
};

export default Header; 