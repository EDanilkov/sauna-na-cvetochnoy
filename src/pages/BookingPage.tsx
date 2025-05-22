import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../App';
import { sendBookingRequest } from '../services/api.service';

const BADGES = [
  { icon: <svg className="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>, text: 'Рейтинг 4.9 на Google' },
  { icon: <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>, text: '200+ бронирований в месяц' },
  { icon: <svg className="w-5 h-5 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, text: 'Свободно на этой неделе' },
];

const STEP_LABELS = [
  'Выберите дату',
  'Выберите время',
  'Сколько гостей?',
  'Ваш телефон',
];

const GUEST_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  let label = `${n} `;
  if (n === 1) label += 'гость';
  else if (n < 5) label += 'гостя';
  else label += 'гостей';
  return { value: n.toString(), label };
});

// --- CustomDatePicker ---
const CustomDatePicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
  busyDates: string[];
  openDropdown: null | 'date' | 'time' | 'guests';
  setOpenDropdown: (v: null | 'date' | 'time' | 'guests') => void;
}> = ({ value, onChange, busyDates, openDropdown, setOpenDropdown }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const ref = React.useRef<HTMLDivElement>(null);
  const [openUp, setOpenUp] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  // yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate()); // теперь yesterday — это вчерашний день, disabled
  const minDateStr = yesterday.toISOString().split('T')[0];
  const updateOpenUp = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOpenUp(rect.bottom + 320 > window.innerHeight && rect.top > 320);
    }
  };
  const handleOpen = () => {
    updateOpenUp();
    setOpenDropdown(openDropdown === 'date' ? null : 'date');
  };
  React.useEffect(() => {
    if (openDropdown !== 'date') return;
    updateOpenUp();
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.custom-dropdown-root')) setOpenDropdown(null);
    };
    const resizeScrollHandler = () => updateOpenUp();
    document.addEventListener('click', handler);
    window.addEventListener('resize', resizeScrollHandler);
    window.addEventListener('scroll', resizeScrollHandler, true);
    return () => {
      document.removeEventListener('click', handler);
      window.removeEventListener('resize', resizeScrollHandler);
      window.removeEventListener('scroll', resizeScrollHandler, true);
    };
  }, [openDropdown, setOpenDropdown]);
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const weeks: (string | null)[][] = [];
  let week: (string | null)[] = Array((firstDay + 6) % 7).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    week.push(dateStr);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  const isToday = (dateStr: string) => dateStr === today.toISOString().split('T')[0];
  const isSelected = (dateStr: string) => dateStr === value;
  const isBusy = (dateStr: string) => busyDates.includes(dateStr);
  const isBeforeMin = (dateStr: string) => dateStr < minDateStr;
  return (
    <div className="relative w-full custom-dropdown-root" ref={ref}>
      <button
        type="button"
        className="w-full rounded-2xl border border-[#b6b09a] px-10 py-3 text-base bg-white text-left shadow-sm transition focus:shadow-md focus:border-[#b48a5a] flex items-center gap-3 appearance-none pr-8 min-h-[44px] md:min-h-[40px]"
        onClick={handleOpen}
        style={{ minHeight: '2.75rem' }}
      >
        <span className="text-[#b6b09a] absolute left-4">
          <svg width="22" height="22" fill="none" stroke="#b6b09a" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 2v4M16 2v4M4 10h16"/></svg>
        </span>
        {value ? value.split('-').reverse().join('.') : 'Выберите дату'}
        <span className="absolute right-6 text-[#b6b09a]">
          <svg width="22" height="22" fill="none" stroke="#b6b09a" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
        </span>
      </button>
      {openDropdown === 'date' && (
        isMobile ? (
          <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black bg-opacity-40">
            <div className="relative w-full max-w-md mx-auto rounded-t-2xl bg-white shadow-2xl border-t-2 border-[#d4af37] p-2 animate-fade-in max-h-[60vh] overflow-y-auto">
              <button className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setOpenDropdown(null)} aria-label="Закрыть">&times;</button>
              <div className="flex justify-between items-center mb-2">
                <button type="button" className="text-[#3e2c18] px-2 py-1" onClick={() => {
                  if (month === 0) { setMonth(11); setYear(year - 1); } else { setMonth(month - 1); }
                }}>&lt;</button>
                <span className="font-semibold">{`${year} / ${(month + 1).toString().padStart(2, '0')}`}</span>
                <button type="button" className="text-[#3e2c18] px-2 py-1" onClick={() => {
                  if (month === 11) { setMonth(0); setYear(year + 1); } else { setMonth(month + 1); }
                }}>&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1 text-center text-[#b6b09a] text-sm">
                {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d}>{d}</div>)}
              </div>
              {weeks.map((w, i) => (
                <div className="grid grid-cols-7 gap-1 mb-1" key={i}>
                  {w.map((dateStr, j) => dateStr ? (
                    <button
                      key={dateStr}
                      type="button"
                      className={`rounded-lg w-8 h-8 flex items-center justify-center text-sm
                        ${isBusy(dateStr) || isBeforeMin(dateStr) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                          isSelected(dateStr) ? 'bg-[#b48a5a] text-white font-bold' :
                          isToday(dateStr) ? 'border border-[#d4af37] text-[#3e2c18]' :
                          'bg-white text-[#3e2c18] hover:bg-[#e9d5b4]'}
                      `}
                      disabled={isBusy(dateStr) || isBeforeMin(dateStr)}
                      onClick={() => { onChange(dateStr); setOpenDropdown(null); }}
                    >{parseInt(dateStr.split('-')[2], 10)}</button>
                  ) : <div key={j} />)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`absolute left-0 z-30 w-full bg-white rounded-2xl shadow-2xl border-2 border-[#d4af37] p-2 animate-fade-in ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'} max-h-72 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-2">
              <button type="button" className="text-[#3e2c18] px-2 py-1" onClick={() => {
                if (month === 0) { setMonth(11); setYear(year - 1); } else { setMonth(month - 1); }
              }}>&lt;</button>
              <span className="font-semibold">{`${year} / ${(month + 1).toString().padStart(2, '0')}`}</span>
              <button type="button" className="text-[#3e2c18] px-2 py-1" onClick={() => {
                if (month === 11) { setMonth(0); setYear(year + 1); } else { setMonth(month + 1); }
              }}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1 text-center text-[#b6b09a] text-sm">
              {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d}>{d}</div>)}
            </div>
            {weeks.map((w, i) => (
              <div className="grid grid-cols-7 gap-1 mb-1" key={i}>
                {w.map((dateStr, j) => dateStr ? (
                  <button
                    key={dateStr}
                    type="button"
                    className={`rounded-lg w-8 h-8 flex items-center justify-center text-sm
                      ${isBusy(dateStr) || isBeforeMin(dateStr) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                        isSelected(dateStr) ? 'bg-[#b48a5a] text-white font-bold' :
                        isToday(dateStr) ? 'border border-[#d4af37] text-[#3e2c18]' :
                        'bg-white text-[#3e2c18] hover:bg-[#e9d5b4]'}
                    `}
                    disabled={isBusy(dateStr) || isBeforeMin(dateStr)}
                    onClick={() => { onChange(dateStr); setOpenDropdown(null); }}
                  >{parseInt(dateStr.split('-')[2], 10)}</button>
                ) : <div key={j} />)}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

// --- CustomDropdown ---
const CustomDropdown: React.FC<{
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string; disabled?: boolean; icon?: React.ReactNode }[];
  placeholder: string;
  icon: React.ReactNode;
  dropdownKey: 'time' | 'guests';
  openDropdown: null | 'date' | 'time' | 'guests';
  setOpenDropdown: (v: null | 'date' | 'time' | 'guests') => void;
}> = ({ value, onChange, options, placeholder, icon, dropdownKey, openDropdown, setOpenDropdown }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [openUp, setOpenUp] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const updateOpenUp = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOpenUp(rect.bottom + 240 > window.innerHeight && rect.top > 240);
    }
  };
  const handleOpen = () => {
    updateOpenUp();
    setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey);
  };
  React.useEffect(() => {
    if (openDropdown !== dropdownKey) return;
    updateOpenUp();
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.custom-dropdown-root')) setOpenDropdown(null);
    };
    const resizeScrollHandler = () => updateOpenUp();
    document.addEventListener('click', handler);
    window.addEventListener('resize', resizeScrollHandler);
    window.addEventListener('scroll', resizeScrollHandler, true);
    return () => {
      document.removeEventListener('click', handler);
      window.removeEventListener('resize', resizeScrollHandler);
      window.removeEventListener('scroll', resizeScrollHandler, true);
    };
  }, [openDropdown, dropdownKey, setOpenDropdown]);
  return (
    <div className="relative w-full custom-dropdown-root" ref={ref}>
      <button
        type="button"
        className="w-full rounded-2xl border border-[#b6b09a] px-10 py-3 text-base bg-white text-left shadow-sm transition focus:shadow-md focus:border-[#b48a5a] flex items-center gap-3 appearance-none pr-8 min-h-[44px] md:min-h-[40px]"
        onClick={handleOpen}
        style={{ minHeight: '2.75rem' }}
      >
        <span className="text-[#b6b09a] absolute left-4">{icon}</span>
        {value ? (options.find(o => o.value === value)?.icon ? <>{options.find(o => o.value === value)?.icon} {options.find(o => o.value === value)?.label}</> : options.find(o => o.value === value)?.label) : <span className="text-[#b6b09a]">{placeholder}</span>}
        <span className="absolute right-6 text-[#b6b09a]">
          <svg width="18" height="18" fill="none" stroke="#b6b09a" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </button>
      {openDropdown === dropdownKey && (
        isMobile ? (
          <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black bg-opacity-40">
            <div className="relative w-full max-w-md mx-auto rounded-t-2xl bg-white shadow-2xl border-t-2 border-[#d4af37] p-1 animate-fade-in max-h-[60vh] overflow-y-auto">
              <button className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setOpenDropdown(null)} aria-label="Закрыть">&times;</button>
              {options.map(o => (
                <button
                  key={o.value}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm mb-1 transition
                    ${o.disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                      value === o.value ? 'bg-[#b48a5a] text-white font-bold' :
                      'hover:bg-[#e9d5b4] text-[#3e2c18]'}
                  `}
                  disabled={o.disabled}
                  onClick={() => { if (!o.disabled) { onChange(o.value); setOpenDropdown(null); } }}
                >{o.icon}{o.label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`absolute left-0 z-40 w-full bg-white rounded-2xl shadow-2xl border-2 border-[#d4af37] p-1 animate-fade-in ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'} max-h-48 overflow-y-auto`} style={{ maxWidth: '100vw' }}>
            {options.map(o => (
              <button
                key={o.value}
                type="button"
                className={`w-full text-left px-3 py-2 rounded-xl text-sm mb-1 transition
                  ${o.disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                    value === o.value ? 'bg-[#b48a5a] text-white font-bold' :
                    'hover:bg-[#e9d5b4] text-[#3e2c18]'}
                `}
                disabled={o.disabled}
                onClick={() => { if (!o.disabled) { onChange(o.value); setOpenDropdown(null); } }}
              >{o.icon}{o.label}</button>
            ))}
          </div>
        )
      )}
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<null | 'date' | 'time' | 'guests'>(null);
  const busyDates: string[] = [];
  const busyTimes: string[] = [];
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Step validation
  const validateStep = () => {
    if (step === 0 && !date) return 'Выберите дату';
    if (step === 1 && !time) return 'Выберите время';
    if (step === 2 && !guests) return 'Выберите количество гостей';
    if (step === 3 && (!/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone) || !name.trim())) return 'Введите корректный телефон и имя';
    return '';
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(step + 1);
  };
  const handlePrev = () => { setError(''); setStep(step - 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);

    try {
      console.log('Frontend: Отправка данных бронирования:', {
        date,
        time,
        duration: '2', // По умолчанию 2 часа
        guests,
        name,
        phone
      });

      await sendBookingRequest({
        date,
        time,
        duration: '2',
        guests,
        name,
        phone
      });

      showToast('Спасибо за бронирование! Наш менеджер свяжется с вами в ближайшее время.', '/images/sauna-booking.jpg');
      navigate('/');
    } catch (error) {
      console.error('Frontend: Ошибка при отправке бронирования:', error);
      setError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Левая часть — оффер, фото, бейджи */}
      <div className="relative flex-1 flex flex-col justify-center items-center bg-[#3e2c18] px-6 py-12 lg:py-0 overflow-hidden">
        <img src="/images/sauna-booking.jpg" alt="Сауна" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3e2c18]/90 to-[#b48a5a]/60" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-wide drop-shadow-lg">Сауна только для своих</h1>
          <p className="text-xl md:text-2xl text-[#f5eee6] mb-8 font-medium drop-shadow">Дубовый пар, ледяной душ и полное уединение. Забронируй, пока не заняли.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {BADGES.map(b => (
              <span key={b.text} className="inline-flex items-center bg-[#e9d5b4]/90 text-[#3e2c18] px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                {b.icon}{b.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Правая часть — step-by-step форма */}
      <div className="flex-1 flex items-center justify-center bg-[#f5eee6] px-4 py-12">
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 border border-[#e9d5b4] flex flex-col gap-8">
          <div className="flex items-center justify-between mb-2">
            {STEP_LABELS.map((label, idx) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg mb-1 transition-all duration-200 ${step === idx ? 'bg-[#b48a5a] text-white shadow-lg scale-110' : 'bg-[#e9d5b4] text-[#7c5c36] opacity-60'}`}>{idx + 1}</div>
                <span className={`text-xs text-center ${step === idx ? 'text-[#7c5c36] font-semibold' : 'text-[#b6b09a]'}`}>{label}</span>
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-date" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <CustomDatePicker
                  value={date}
                  onChange={setDate}
                  busyDates={busyDates}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step-time" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <CustomDropdown
                  value={time}
                  onChange={setTime}
                  options={Array.from({ length: 14 }, (_, i) => {
                    const t = `${(10 + i).toString().padStart(2, '0')}:00`;
                    return { value: t, label: t + (busyTimes.includes(t) ? ' (занято)' : ''), disabled: busyTimes.includes(t) };
                  })}
                  placeholder="Выберите время"
                  icon={<svg width="22" height="22" fill="none" stroke="#b6b09a" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                  dropdownKey="time"
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step-guests" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <CustomDropdown
                  value={guests}
                  onChange={setGuests}
                  options={GUEST_OPTIONS}
                  placeholder="Количество гостей"
                  icon={<svg width="22" height="22" fill="none" stroke="#b6b09a" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 10v2a5 5 0 0010 0v-2"/><rect x="5" y="14" width="14" height="6" rx="3"/></svg>}
                  dropdownKey="guests"
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step-phone" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <div className="mb-4">
                  <InputMask
                    mask="+375 (99) 999-99-99"
                    placeholder="+375 (__) ___-__-__"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#b6b09a] px-6 py-4 text-lg focus:outline-none focus:border-[#b48a5a] bg-[#f5eee6] text-[#3e2c18]"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#b6b09a] px-6 py-4 text-lg focus:outline-none focus:border-[#b48a5a] bg-[#f5eee6] text-[#3e2c18]"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>
          {error && <div className="text-red-500 text-center font-semibold text-sm -mt-2">{error}</div>}
          <div className="flex gap-2 mt-2">
            {step > 0 && <button type="button" onClick={handlePrev} className="flex-1 py-3 rounded-xl bg-[#e9d5b4] text-[#7c5c36] font-semibold text-lg transition hover:bg-[#b48a5a]">Назад</button>}
            {step < 3 && <button type="button" onClick={handleNext} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b48a5a] to-[#d4af37] text-white font-bold text-lg transition hover:from-[#d4af37] hover:to-[#b48a5a] shadow-md">Далее</button>}
            {step === 3 && <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#b48a5a] to-[#d4af37] text-white font-bold text-lg transition hover:from-[#d4af37] hover:to-[#b48a5a] shadow-md flex items-center justify-center">{loading ? <span className="loader mr-2" /> : 'Забронировать сейчас'}</button>}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default BookingPage; 