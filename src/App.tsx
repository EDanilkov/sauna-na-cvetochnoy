import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import Locations from './components/Locations';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingPage from './pages/BookingPage';
import './App.css';

// Toast Context
interface ToastContextType {
  showToast: (message: string, imageUrl?: string) => void;
}
const ToastContext = createContext<ToastContextType>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; imageUrl?: string } | null>(null);
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  return (
    <ToastContext.Provider value={{ showToast: (message, imageUrl) => setToast({ message, imageUrl }) }}>
      {children}
      {toast && (
        <div className="fixed top-4 left-1/2 z-[9999] -translate-x-1/2 bg-white/95 border-2 border-[#d4af37] shadow-2xl rounded-2xl flex items-center gap-3 px-4 py-3 animate-fade-in backdrop-blur-lg max-w-[95vw] sm:max-w-[90vw] sm:px-6 sm:py-4 sm:gap-4"
          style={{ minWidth: '220px', maxWidth: '95vw', width: 'auto' }}>
          {toast.imageUrl && (
            <img src={toast.imageUrl} alt="Баня" className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded-xl border border-[#e7dfc7]" />
          )}
          <span className="text-base sm:text-lg font-semibold text-[#2d4c3b] break-words" style={{ maxWidth: '60vw' }}>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Banner />
        <About />
        <Locations />
        <Services />
        <Reviews />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
