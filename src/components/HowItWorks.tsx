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
  {
    number: 1,
    icon: Search,
    title: "Chọn môn thể thao",
    description: "Chọn từ tennis, bóng rổ, bóng đá, cầu lông… và thiết lập trình độ cũng như sở thích của bạn."
  },
  {
    number: 2,
    icon: Users,
    title: "ìm bạn cùng chơi",
    description: "Duyệt hồ sơ người chơi gần bạn. Gửi lời mời tham gia hoặc tham gia trận đấu có sẵn."
  },
  {
    number: 3,
    icon: Calendar,
    title: "Đặt sân",
    description: "Đặt sân có sẵn, so sánh giá, kiểm tra tiện nghi và xác nhận chỗ chơi."
  },
  {
    number: 4,
    icon: Play,
    title: "Tận hưởng",
    description: "Xuất hiện và chơi ngay! Đánh giá trải nghiệm và xây dựng cộng đồng thể thao của bạn."
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

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

    // Timeline animation
    if (timelineRef.current) {
      gsap.fromTo(timelineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Steps animation
    stepsRef.current.forEach((step, index) => {
      if (step) {
        gsap.fromTo(step,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: step,
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
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2">
            <div 
              ref={timelineRef}
              className="h-full bg-[#5A983B] origin-left"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={el => stepsRef.current[index] = el!}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-white border-4 border-[#5A983B] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <step.icon className="w-8 h-8 text-[#5A983B]" />
                </motion.div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-8 h-8 bg-[#5A983B] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
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

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={el => stepsRef.current[index] = el!}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 relative">
                <motion.div
                  className="w-16 h-16 bg-[#5A983B] rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 w-0.5 h-8 bg-gray-300 transform -translate-x-1/2" />
                )}
              </div>
              
              <div className="flex-1 card p-6">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-[#5A983B] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600">
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