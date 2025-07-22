import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Play, Apple, Smartphone } from 'lucide-react';

const DownloadCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#5A983B] to-[#4E8A32] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bạn đã sẵn sàng tìm trận đấu của mình?

          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người chơi đã và đang sử dụng SportNow để tìm bạn đồng hành thể thao lý tưởng

          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Phone Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A983B] to-[#4E8A32] p-4">
                  <div className="text-center text-white space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-[#5A983B]" />
                    </motion.div>
                    <h3 className="text-lg font-bold">SportNow</h3>
                    <p className="text-sm">Find • Play • Connect</p>
                  </div>
                  
                  <div className="mt-8 space-y-2">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-white rounded mb-1"></div>
                          <div className="h-2 bg-white bg-opacity-60 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-white rounded mb-1"></div>
                          <div className="h-2 bg-white bg-opacity-60 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Download Options */}
          <div className="space-y-8">
            <motion.div
            href={"/apk/sportnow.apk"}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Tải SportNow ngay hôm nay

              </h3>
              
              <div className="space-y-4">
                <motion.button
                href={"/apk/sportnow.apk"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-black text-white p-4 rounded-xl flex items-center space-x-4 hover:bg-gray-800 transition-colors"
                >
                  <Apple className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-black text-white p-4 rounded-xl flex items-center space-x-4 hover:bg-gray-800 transition-colors"
                >
                  <Smartphone className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-xl font-semibold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm"
            >
              <h4 className="text-xl font-semibold text-white mb-4">
                Nhận thông báo khi chúng tôi ra mắt
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-[#5A983B] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Thông báo cho tôi
                  </motion.button>
                </div>
              </form>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-green-100 text-center"
                >
                  ✓ Cảm ơn! Chúng tôi sẽ thông báo tới bạn ngay khi sản phẩm được ra mắt.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;