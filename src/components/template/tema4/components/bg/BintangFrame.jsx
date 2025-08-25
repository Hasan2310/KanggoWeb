import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Bintang from '../../assets/page/Bintang.png'

const BintangFrame = ({ isBottom = false }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`absolute left-0 w-full pointer-events-none z-0 ${isBottom ? 'bottom-0' : 'top-0'}`}
    >
      <motion.img
        src={Bintang}
        alt="bintang"
        className={`w-full opacity-80 ${isBottom ? 'rotate-180' : ''}`}
        initial={{ opacity: 0, y: isBottom ? 20 : -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

export default BintangFrame
