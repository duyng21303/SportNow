import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, MessageSquare, MapPin, Clock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Ghép đôi đồng đội",
    description: "Kết nối với những người chơi cùng trình độ và sở thích — tìm đồng đội hoàn hảo trong chớp mắt.",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Calendar,
    title: "Đặt sân siêu tốc",
    description: "Chốt ngay sân và tiện ích trong thời gian thực. So sánh giá, kiểm tra tình trạng và hoàn tất chỉ với vài chạm.",
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: MessageSquare,
    title: "Chat tức thì",
    description: "Trò chuyện ngay lập tức với cộng đồng thể thao. Lên lịch, trao đổi chiến thuật và gắn kết đồng đội dễ dàng.",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: MapPin,
    title: "Tìm sân xung quanh",
    description: "Khám phá sân bãi gần bạn nhất. Lọc theo môn, khoảng cách và đánh giá để chọn địa điểm lý tưởng.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Clock,
    title: "Lịch linh hoạt",
    description: "Tự động lên lịch theo nhu cầu: đặt lại hàng tuần, tham gia trận có sẵn hay tạo sự kiện riêng cho nhóm.",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    icon: Star,
    title: "Đánh giá & Chia sẻ",
    description: "Đóng góp đánh giá cho người chơi và địa điểm. Xây dựng uy tín cá nhân và khám phá những chỗ chơi tuyệt vời.",
    gradient: "from-indigo-500 to-blue-600"
  }
];


const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-gray-900 mb-4">
             Tất cả những gì bạn cần để chơi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SportNow kết nối người chơi, sân bãi và cộng đồng trên một nền tảng duy nhất. Khám phá các tính năng được thiết kế nhằm nâng cao trải nghiệm thể thao của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              ref={el => cardsRef.current[index] = el!}
              whileHover={{ scale: 1.05 }}
              className="card p-8 relative overflow-hidden group cursor-pointer"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <motion.div
                className="w-16 h-16 bg-[#5A983B] rounded-2xl flex items-center justify-center mb-6 relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="feature-title text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-[#5A983B] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ transform: 'translate(50%, -50%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;