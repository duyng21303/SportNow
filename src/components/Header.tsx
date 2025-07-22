import React, { useState, useEffect, useMemo  } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Play, Download, ArrowRight } from 'lucide-react';
import Hero from './Hero';
import { theme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import logo from '../images/logo.png';
const baseIcons = ['🏀','🎾','⚽','🏐','🏓','🏸','🥎','🥏','🏉','🏒','🏑','🥅'];

// 2) Số lượng icon muốn sinh
const NUM_ICONS = 20;

// 3) Tạo config random cho mỗi icon
const createConfig = () => ({
  icon:      baseIcons[Math.floor(Math.random() * baseIcons.length)],
  initialX:  Math.random() * 100,
  initialY:  60 + Math.random() * 30,
  deltaX:    (Math.random() * 2 - 1) * 150,
  deltaY:    -(50 + Math.random() * 200),
  duration:  5 + Math.random() * 5,
  delay:     Math.random() * 3,
  scale:     0.5 + Math.random() * 1.2,
  rotateBy:  360 * (Math.random() > 0.5 ? 1 : -1),
  size:      30 + Math.random() * 70,
  bgOpacity: 0.1 + Math.random() * 0.3,
  zIndex:    Math.floor(Math.random() * 3)
});
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   const iconConfigs = useMemo(
    () => Array.from({ length: NUM_ICONS }).map(() => createConfig()),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
             <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center"
    >
      {/* Phóng to logo: xóa luôn phần text phía sau */}
      <img
        src={logo}
        alt="Logo SportNow"
        className="w-40 h-auto object-contain"
      />
    </motion.div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`hover:text-[#5A983B] transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>Tính năng</a>
              <a href="#how-it-works" className={`hover:text-[#5A983B] transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>Cách thức</a>
              <a href="#testimonials" className={`hover:text-[#5A983B] transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>Đánh giá</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               
              >
                 <a
    href="/sportnow.apk"
    download
     className="bg-[#5A983B] text-white px-6 py-2 rounded-full hover:bg-[#4E8A32] transition-colors"
  >
                Tải ứng dụng
                </a>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-[#5A983B]">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-[#5A983B]">How It Works</a>
              <a href="#testimonials" className="block text-gray-700 hover:text-[#5A983B]">Reviews</a>
              <button className="w-full bg-[#5A983B] text-white px-6 py-2 rounded-full hover:bg-[#4E8A32] transition-colors">
                Download App
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A983B] to-[#4E8A32]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full opacity-10"></div>
        </div>
      </div>
{/* Floating Icons */}
         {/* Flying Icons (chỉ icon, không background circle) */}
{iconConfigs.map((cfg, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, scale: cfg.scale }}
    animate={{
      x:       [0, cfg.deltaX, 0],
      y:       [0, cfg.deltaY, 0],
      rotate:  [0, cfg.rotateBy],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration:   cfg.duration,
      delay:      cfg.delay,
      repeat:     Infinity,
      repeatType: 'loop',
      ease:       'easeInOut'
    }}
    style={{
      position:      'absolute',
      left:          `${cfg.initialX}%`,
      top:           `${cfg.initialY}%`,
      fontSize:      cfg.size,       // emoji sẽ to đúng bằng size
      lineHeight:    1,
      zIndex:        cfg.zIndex,
      pointerEvents: 'none',
      // nếu muốn outline nhẹ cho emoji:
      textShadow:    '0 0 4px rgba(0,0,0,0.3)'
    }}
  >
    {cfg.icon}
  </motion.span>
))}

      {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
    <ThemeProvider theme={theme}>
      <Hero />
    </ThemeProvider>
  </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;