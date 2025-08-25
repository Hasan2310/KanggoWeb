import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Garis from '../../assets/page/Garis.png'

const GarisFrame = ({ position = 'top-left' }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  const positionClass = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3',
  }[position]

  const rotationClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'rotate-180 scale-x-[-1]',
    'bottom-right': 'rotate-180',
  }[position]

  return (
    <div
      ref={ref}
      className={`absolute ${positionClass} pointer-events-none z-30`}
    >
      <motion.img
        src={Garis}
        alt="garis"
        className={`w-[160px] md:w-[220px] lg:w-[300px] ${rotationClass}`}
        initial={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

export default GarisFrame
