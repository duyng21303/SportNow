import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';

const LiveDemo: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courts = [
    {
      id: 1,
      name: "Sân Tennis TT TDTT Quận Thủ Đức",
      sport: "Quần vợt",
      price: "150.000₫/giờ",
      available: "3 sân trống",
      position: { top: "20%", left: "30%" },
      delay: 0.1
    },
    {
      id: 2,
      name: "Sân Bóng Rổ Hyperhall",
      sport: "Bóng rổ",
      price: "Liên hệ",
      available: "2 sân trống",
      position: { top: "50%", left: "60%" },
      delay: 0.2
    },
    {
      id: 3,
      name: "Sân Bóng Đá Cầu Nam Lý",
      sport: "Bóng đá",
      price: "200.000₫/giờ",
      available: "5 sân trống",
      position: { top: "70%", left: "25%" },
      delay: 0.3
    },
    {
      id: 4,
      name: "Sân Cầu Lông Tường Anh",
      sport: "Cầu lông",
      price: "60.000₫/giờ",
      available: "6 sân trống",
      position: { top: "30%", left: "70%" },
      delay: 0.4
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Tiêu đề chính */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tìm Sân Thể Thao Gần Bạn
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bản đồ tương tác hiển thị tình trạng sẵn sàng và giá theo thời gian thực
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* → ĐỔI overflow-hidden thành overflow-visible */}
          <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 min-h-96 overflow-visible">

            {/* Pattern nền bản đồ */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>

            {/* Marker sân */}
            {courts.map((court) => (
              <motion.div
                key={court.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: court.delay, duration: 0.6 }}
                className="absolute"
                style={court.position}
              >
                <div className="relative group cursor-pointer">
                  {/* Map Pin */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-[#5A983B] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </motion.div>

                  {/* Pulsing */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -left-2 w-12 h-12 bg-[#5A983B] rounded-full opacity-20"
                  />

                  {/* 
                    → THẺ INFO: 
                      - default: opacity-0 + pointer-events-none 
                      - khi hover vào pin (group-hover) hoặc hover vào chính thẻ (hover:) thì show + pointer-events-auto 
                  */}
                  <div
                    className="
                      absolute bottom-10 left-1/2 transform -translate-x-1/2
                      bg-white p-4 rounded-lg shadow-lg min-w-64
                      opacity-0 translate-y-2
                      transition-all duration-300
                      pointer-events-none
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                      hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto
                    "
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {court.name}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{court.sport}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{court.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-green-600">{court.available}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-[#5A983B] text-white py-2 rounded-lg text-sm hover:bg-[#4E8A32] transition-colors">
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>

          {/* Chú giải bản đồ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center space-x-8 text-sm text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#5A983B] rounded-full"></div>
              <span>Sân khả dụng</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span>Sân đã đặt</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Sân cao cấp</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
