import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Users, Calendar, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: number;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: 1, icon: Search,   title: "Chọn môn thể thao", description: "Chọn từ tennis, bóng rổ, bóng đá, cầu lông… và thiết lập trình độ cũng như sở thích của bạn." },
  { number: 2, icon: Users,    title: "Tìm bạn cùng chơi",  description: "Duyệt hồ sơ người chơi gần bạn. Gửi lời mời tham gia hoặc tham gia trận đấu có sẵn." },
  { number: 3, icon: Calendar, title: "Đặt sân",           description: "Đặt sân có sẵn, so sánh giá, kiểm tra tiện nghi và xác nhận chỗ chơi." },
  { number: 4, icon: Play,     title: "Tận hưởng",         description: "Xuất hiện và chơi ngay! Đánh giá trải nghiệm và xây dựng cộng đồng thể thao của bạn." }
];

const HowItWorks: React.FC = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Title fade-in
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start:   "top 80%",
          end:     "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Desktop timeline line draw
    if (timelineRef.current) {
      gsap.fromTo(timelineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, transformOrigin: "left center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start:   "top 80%",
            end:     "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Steps reveal
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i*0.2,
          scrollTrigger: {
            trigger: el,
            start:   "top 80%",
            end:     "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title text-gray-900 mb-4">
            Cách Thức Hoạt Động
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bắt đầu với SportNow thật đơn giản. Làm theo các bước dễ dàng dưới đây để tìm trận đấu hoàn hảo cho bạn.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2">
            <div ref={timelineRef} className="h-full bg-[#5A983B] origin-left" />
          </div>
          {/* Steps */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx}
                   ref={el => stepsRef.current[idx] = el!}
                   className="text-center">
                <motion.div
                  className="w-20 h-20 bg-white border-4 border-[#5A983B] rounded-full 
                             flex items-center justify-center mx-auto mb-6 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className="w-8 h-8 text-[#5A983B]" />
                </motion.div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-8 h-8 bg-[#5A983B] text-white rounded-full 
                                 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (đã sửa để luôn nằm giữa) */}
        <div className="lg:hidden flex flex-col items-center space-y-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              ref={el => stepsRef.current[idx] = el!}
              className="flex flex-col items-center text-center w-full max-w-xs mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#5A983B] rounded-full 
                           flex items-center justify-center mb-4"
              >
                <step.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="w-px h-8 bg-gray-300 mb-4" />
              )}

              {/* Card Content */}
              <div className="bg-white p-6 rounded-xl shadow-lg w-full">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-6 h-6 bg-[#5A983B] text-white rounded-full 
                                 flex items-center justify-center text-xs font-bold mr-2">
                    {step.number}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
