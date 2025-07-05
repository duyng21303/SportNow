// src/components/SportAnimation.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Users, MapPin,  } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren:   0.2,
    }
  }
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180, y: 0 },
  visible: (custom: number) => ({
    scale:  1,
    rotate: 0,
    // bobbing up-down:
    y: [0, -10, 0],
    transition: {
      // pop-in
      scale:  { type: "spring", stiffness: 260, damping: 20 },
      rotate: { type: "spring", stiffness: 260, damping: 20 },
      // bobbing
      y: {
        duration:   2,
        repeat:     Infinity,
        repeatType: "loop",
        ease:       "easeInOut",
        delay:      custom * 0.5,   // pha lệch theo index
      }
    }
  })
};

const icons = [
  {
    Icon: Users,
    containerClass: "w-20 h-20 bg-white/20",
    iconClass:      "w-10 h-10",
  },
  {
    // Inline SVG cây vợt luôn tại đây
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4" />
        <path d="M12 12a12.6 12.6 0 0 1-8.7 5" />
        <path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5" />
        <path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10" />
        <path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5" />
        <circle cx={12} cy={12} r={10} />
      </svg>
    ),
    containerClass: "w-24 h-24 bg-white/20",
    iconClass:      "w-12 h-12",
  },
  {
    Icon: MapPin,
    containerClass: "w-20 h-20 bg-white/20",
    iconClass:      "w-10 h-10",
  },
] as const;

const SportAnimation: React.FC = () => (
  <motion.div
    className="flex justify-center items-center gap-8 mb-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {icons.map(({ Icon, containerClass, iconClass }, i) => (
      <motion.div
        key={i}
        custom={i}
        variants={iconVariants}
        className={`
          ${containerClass}
          rounded-full 
          flex items-center justify-center
        `}
      >
        <Icon className={`text-white ${iconClass}`} />
      </motion.div>
    ))}
  </motion.div>
);

export default SportAnimation;
