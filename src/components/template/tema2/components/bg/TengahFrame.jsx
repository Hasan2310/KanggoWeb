import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Garis from '../../page/tengahatas.png';

const CenterFrame = ({ position = 'top-center' }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const positionClass = {
    'top-center': 'top-0 left-0 right-0 flex justify-center',
    'bottom-center': 'bottom-3 left-0 right-0 flex justify-center',
  }[position];

  const rotationClass = {
    'top-center': '',
    'bottom-center': 'rotate-180',
  }[position];

  return (
    <div
      ref={ref}
      className={`absolute ${positionClass} pointer-events-none z-30`}
    >
      <motion.img
        src={Garis}
        alt="garis"
        className={`w-[160px] ${rotationClass}`}
        initial={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  );
};

export default CenterFrame;
