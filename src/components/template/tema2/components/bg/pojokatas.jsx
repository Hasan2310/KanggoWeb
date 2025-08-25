import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Pojokkanan from '../../page/pojokatas.png'

const pojokatasframe = ({ position = 'top-right' }) => {
  const [ref, inView] = useInView({ triggerOnce: true })

  const positionClass = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }[position]

  const rotationClass = {
    'top-left': 'scale-x-[-1]',
    'top-right': '',
    'bottom-left': 'rotate-180',
    'bottom-right': 'rotate-180 scale-x-[-1]',
  }[position]

  return (
    <div
      ref={ref}
      className={`absolute ${positionClass} pointer-events-none z-10`}
    >
      <motion.img
        src={Pojokkanan}
        alt="pojok"
        className={`w-[130px] opacity-80 ${rotationClass}`}
        initial={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

export default pojokatasframe
