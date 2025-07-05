import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence  } from 'framer-motion';
import { Play, Download, ArrowRight, Smartphone } from 'lucide-react';
import SportAnimation from './SportAnimation';

const HeroContainer = styled.section`
  min-height: 100vh;
  
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Gradient ngang: đậm bên trái → nhạt bên phải */
  background: linear-gradient(
    90deg,
    var(--primary-green-dark)   0%,    /* #4A7E32 – xanh lá đậm */
    var(--primary-green)        50%,   /* #5A983B – xanh lá chính */
    var(--primary-green-light) 100%    /* #6BAA47 – xanh lá nhạt */
  );

  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%      { transform: translateY(-20px); }
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const TextContent = styled.div`
  color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 24px;
  font-weight: 800;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  padding: 16px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  transition: all 0.3s ease;
  min-width: 180px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 16px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 180px;
  justify-content: center;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhoneMockup = styled(motion.div)`
  width: 300px;
  height: 600px;
  /* Màu nền vỏ máy nhạt, sát với nhựa/kính thật */
  background: #f5f5f7;
  /* Viền nhẹ, màu sáng hơn tạo cảm giác vỏ nhôm/kính */
  border: 1.5px solid #e0e0e5;
  border-radius: 40px;
  /* Bóng đổ ngoài sâu và bóng trong nhẹ để tạo độ nổi */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.6),
    0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  /* Lỗ loa/mic */
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 6px;
    background: #c7c7cc;
    border-radius: 3px;
    z-index: 10;
  }

  /* Hiệu ứng “sheen” phản chiếu trên kính */
  &::after {
    content: '';
    position: absolute;
    top: -20%;
    left: -40%;
    width: 160%;
    height: 150%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: rotate(-25deg);
    pointer-events: none;
    z-index: 50;
  }
`;

const PhoneScreen = styled.div`
  position: absolute;
  top: 40px;
  overflow: hidden;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.accent} 100%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  z-index:20;
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  color: ${({ theme }) => theme.colors.black};
`;

const slides = [
  new URL('../images/slide.png', import.meta.url).href,
  new URL('../images/slide1.png', import.meta.url).href,
  new URL('../images/slide2.png', import.meta.url).href,
  new URL('../images/slide3.png', import.meta.url).href,
  new URL('../images/slide4.png', import.meta.url).href,
];

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#4a7f32",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <HeroContainer>
      <BackgroundPattern />
      <div className="container">
        <HeroContent>

          {/* ————— CHỈ SỬA PHẦN NÀY ————— */}
          <div className="relative mx-auto max-w-4xl">
            {/* overlay chỉ che icon và blur background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg" />
            {/* đây mới là content thật */}
            <div className="relative z-10 px-4 py-6 text-center text-white">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
              >
                <motion.div variants={itemVariants as any} className="mb-8">
                  <SportAnimation />
                </motion.div>

                <motion.h1 
                  variants={itemVariants as any}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  Sẵn sàng vào trận
                  <br />
                  <span className="text-yellow-300">Đặt sân trong tích tắc</span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants as any}
                  className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto"
                >
                  Kết nối cộng đồng thể thao, tìm bạn cùng chơi hoàn hảo và đặt sân ngay tức thì. Mọi trận đấu sắp tới của bạn giờ chỉ cách một chạm.
                </motion.p>

                <motion.div 
                  variants={itemVariants as any}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                >
                  <motion.button
                    variants={buttonVariants as any}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-[#5A983B] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg animate-pulse-glow"
                  >
                    <Play className="w-6 h-6" />
                    Bắt đầu ngay
                  </motion.button>

                  <motion.button
                    variants={buttonVariants as any}
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3"
                  >
                    <Smartphone className="w-6 h-6" />
                    Xem Demo
                  </motion.button>
                </motion.div>

                <motion.div 
                  variants={itemVariants as any}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-black rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                  >
                    <Download className="w-8 h-8 text-white" />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-lg font-semibold text-white">App Store</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-black rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                  >
                    <Download className="w-8 h-8 text-white" />
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Get it on</div>
                      <div className="text-lg font-semibold text-white">Google Play</div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* ——————————————————————— */}

          <HeroImage>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <PhoneMockup>
                <PhoneScreen>
                  <AnimatePresence initial={false} mode="sync">
                    {slides.map((src, i) =>
                      i === currentSlide && (
                        <motion.img
                          key={src}
                          src={src}
                          alt={`slide ${i}`}
                          initial={{ x: '100%' }}
                          animate={{ x: '0%' }}
                          exit={{ x: '-100%' }}
                          transition={{
                            type: 'tween',
                            ease: 'easeInOut',
                            duration: 0.8,
                          }}
                          style={{
                            position:   'absolute',
                            top:        0,
                            left:       0,
                            width:      '100%',
                            borderRadius:'20px',
                            height:     '100%',
                            objectFit:  'cover',
                          }}
                        />
                      )
                    )}
                  </AnimatePresence>
                </PhoneScreen>
              </PhoneMockup>
            </motion.div>
            
            <FloatingCard
              style={{ top: '20%', right: '10%' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <strong>Nguyễn Duy</strong>
              <div>⭐⭐⭐⭐⭐</div>
              <div>Đối tác quần vợt</div>
            </FloatingCard>
            
            <FloatingCard
              style={{ bottom: '20%', left: '10%' }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <strong>Sân còn trống</strong>
              <div>🏀Bóng rổ</div>
              <div>100.000đ/giờ</div>
            </FloatingCard>
          </HeroImage>
          
        </HeroContent>
      </div>
    </HeroContainer>
  );
};

export default Hero;
