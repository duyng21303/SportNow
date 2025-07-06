import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import duyImg    from '../images/duy.png';
import huongImg  from '../images/huong.png';
import linhImg   from '../images/linh.png';
import thinhImg  from '../images/Thinh.png';
import phuongImg from '../images/phuong.png';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
  {
    name: "Nguyễn Duy",
    role: "Người yêu thể thao",
    rating: 5,
    comment: "SportNow đã giúp tôi dễ dàng tìm sân và bạn chơi mới ngay trong khu vực. Giao diện thân thiện, đặt sân chỉ trong vài cú chạm!",
    image: duyImg
  },
  {
    name: "Nguyễn Quốc Thịnh",
    role: "Cầu thủ bóng rổ nghiệp dư",
    rating: 5,
    comment: "Nhờ SportNow, tôi đã tìm được đồng đội để tập luyện đều đặn mỗi tuần. Tính năng ghép nhóm rất chính xác và dễ sử dụng.",
    image: thinhImg
  },
  {
    name: "Thu Hương",
    role: "Huấn luyện viên tennis",
    rating: 5,
    comment: "Tôi sử dụng SportNow để tổ chức buổi tập cho học viên. Việc đặt sân và quản lý thanh toán thật suôn sẻ, tiết kiệm thời gian.",
    image: huongImg
  },
  {
    name: "Nguyễn Bảo Đức",
    role: "Người đam mê bóng đá",
    rating: 5,
    comment: "Khả năng xem ngay sân trống và giá cả theo giờ của SportNow rất tiện lợi. Tôi không còn phải gọi điện thoại đi khắp nơi để hỏi sân nữa.",
    image: "https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    name: "Ngọc Linh",
    role: "Fan cầu lông",
    rating: 5,
    comment: "Tôi luôn tìm được sân cầu lông gần nhà và đặt trước dễ dàng. Bạn bè tôi cũng rất thích tính năng nhắc nhở giờ chơi của SportNow.",
    image: linhImg
  },
  {
    name: "Đinh Thị Bích Phượng",
    role: "Người yêu thích bóng bàn",
    rating: 5,
    comment: "Không chỉ dùng để đặt sân, tôi còn tìm được nhóm chạy bộ và lớp bóng bàn chung. SportNow thực sự là nền tảng kết nối cộng đồng thể thao.",
    image: phuongImg
  }
];


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Người chơi của chúng tôi nói gì
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người chơi hài lòng đã tìm được trận đấu hoàn hảo
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#5A983B] to-[#4E8A32] rounded-3xl p-8 md:p-12 text-white"
              >
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </motion.div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="flex items-center justify-center md:justify-start space-x-1 mb-4"
                    >
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                      ))}
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-lg md:text-xl mb-4 leading-relaxed"
                    >
                      "{testimonials[currentTestimonial].comment}"
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <h4 className="font-semibold text-lg">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-green-100">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 bg-[#5A983B] rounded-full flex items-center justify-center text-white hover:bg-[#4E8A32] transition-colors shadow-lg"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-[#5A983B]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 bg-[#5A983B] rounded-full flex items-center justify-center text-white hover:bg-[#4E8A32] transition-colors shadow-lg"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;