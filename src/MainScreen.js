"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const antibiotics = [
  { name: 'Cephradine Gen-1', color1: '#1cdaff', color2: '#006eb5' },
  { name: 'Cefuroxime Gen-2', color1: '#ffc700', color2: '#fd9100'},
  { name: 'Ceftibuten Gen-3', color1: '#00fca8', color2: '#0097a2' },
]

const pathogenName ="Staphlococcus Aureus";

export default function MainScreen() {
  const [score, setScore] = useState(0)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 7)
    return () => clearInterval(interval)
  }, [])

  const handleTap = () => {
    setScore(prev => prev + 1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d0727] text-white p-4">
      <div className="w-full max-w-md aspect-[9/16] bg-[#410332] rounded-3xl overflow-hidden shadow-lg relative">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Pathogen: {pathogenName}</h1>
          <div className="relative aspect-square">
            <div className="absolute inset-[3.8rem] rounded-full border-40 border-[#7c0058]" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: rotation }}
              transition={{ duration: 0, ease: "linear" }}
            >
              {antibiotics.map((antibiotic, index) => (
                <motion.div
                  key={antibiotic.name}
                  className={`absolute w-8 h-8 rounded-full `}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 120}deg) translateX(120px)`,
                    background: `radial-gradient(circle, ${antibiotic.color1}, ${antibiotic.color2})`
                  }}
                />
              ))}
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold">{score}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#590339]">
          {antibiotics.map(antibiotic => (
            <div key={antibiotic.name} className="flex items-center mb-2 last:mb-0">
              <div className={`w-4 h-4 rounded-full mr-2`} 
               style={{  background: `radial-gradient(circle, ${antibiotic.color1}, ${antibiotic.color2})`
                  }}/>
              <span>{antibiotic.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-8 px-6 py-3 bg-purple-600 rounded-full text-xl font-semibold hover:bg-purple-500 transition-colors"
        onClick={handleTap}
      >
        Tap to kill pathogen
      </button>
    </div>
  )
}
