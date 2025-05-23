import { motion } from 'framer-motion';

interface GlowingCirclesProps {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
}

const GlowingCircles: React.FC<GlowingCirclesProps> = ({
  color,
  size,
  top,
  left,
  delay,
}) => {
  return (
    <motion.div
      style={{ top, left }}
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      animate={{
        y: ['0%', '100%', '0%'],
        x: ['0%', '100%', '0%'],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        delay,
      }}
      aria-hidden='true'
    />
  );
};

export default GlowingCircles;
