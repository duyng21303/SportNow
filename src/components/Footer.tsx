import React from 'react';
import { motion } from 'framer-motion';
import { Play, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Tính năng", href: "#features" },
    { name: "Cách hoạt động", href: "#how-it-works" },
    { name: "Lời chứng thực", href: "#testimonials" },
    { name: "Chính sách bảo mật", href: "#" },
    { name: "Điều khoản dịch vụ", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thương hiệu */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#5A983B] rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">SportNow</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Kết nối bạn chơi thể thao và đặt sân ngay lập tức. Trận đấu hoàn hảo chỉ cách bạn một chạm.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#5A983B] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#5A983B]" />
                <span className="text-gray-400">lienhe@sportnow.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#5A983B]" />
                <span className="text-gray-400">+84 912 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#5A983B]" />
                <span className="text-gray-400">Thành phố Thủ Đức, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nhận tin mới</h4>
            <p className="text-gray-400 mb-4">
              Đăng ký để nhận tin tức và cập nhật từ SportNow.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#5A983B] focus:border-transparent outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#5A983B] text-white py-2 rounded-lg hover:bg-[#4E8A32] transition-colors"
              >
                Đăng ký
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 SportNow. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
