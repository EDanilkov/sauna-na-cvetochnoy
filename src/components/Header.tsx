import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('banner');

  const menuItems = [
    { label: 'Главная', to: 'banner' },
    { label: 'О нас', to: 'about' },
    { label: 'Локации', to: 'locations' },
    { label: 'Услуги', to: 'services' },
    { label: 'Отзывы', to: 'reviews' },
    { label: 'Галерея', to: 'gallery' },
    { label: 'Контакты', to: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  const handleBookingClick = () => {
    setActiveSection('');
    navigate('/booking');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <button 
          onClick={() => scrollToSection('banner')}
          className="text-2xl font-bold tracking-widest text-[#e7dfc7] cursor-pointer"
        >
          На Цветочной
        </button>
        <nav className="hidden md:flex space-x-8">
          {menuItems.map(item => (
            <button
              key={item.to}
              onClick={() => scrollToSection(item.to)}
              className={`cursor-pointer text-[#e7dfc7] hover:text-[#b6b09a] transition text-lg font-medium ${
                activeSection === item.to ? 'text-[#5e7c6a]' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBookingClick}
            className="px-6 py-2 rounded-2xl bg-[#e7dfc7] text-[#2d4c3b] font-semibold text-lg shadow hover:bg-[#d6ceb6] transition"
          >
            ЗАБРОНИРОВАТЬ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 