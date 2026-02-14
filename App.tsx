import { useState, useEffect, useRef } from 'react'
import './App.css'
import HeroSection from './sections/HeroSection'
import LoveTestSection from './sections/LoveTestSection'
import LoveMeterSection from './sections/LoveMeterSection'
import MessageSection from './sections/MessageSection'
import FooterSection from './sections/FooterSection'
import Confetti from './components/Confetti'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger confetti after a delay
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return
      
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollPosition / windowHeight)
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection])

  return (
    <div ref={mainRef} className="relative bg-valentine-pink min-h-screen">
      {/* SVG Filter for distortion effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="distortion">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="pixelate">
            <feFlood x="2" y="2" height="2" width="2" />
            <feComposite width="8" height="8" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="2" />
          </filter>
        </defs>
      </svg>

      {/* Confetti overlay */}
      {showConfetti && <Confetti />}

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <LoveTestSection />
        <LoveMeterSection />
        <MessageSection />
        <FooterSection />
      </main>

      {/* Fixed decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Floating hearts */}
        <div className="absolute top-[10%] left-[5%] text-white text-4xl opacity-30 animate-float" style={{ animationDelay: '0s' }}>
          ❤️
        </div>
        <div className="absolute top-[30%] right-[8%] text-white text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          💕
        </div>
        <div className="absolute top-[60%] left-[10%] text-white text-5xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>
          💗
        </div>
        <div className="absolute top-[80%] right-[5%] text-white text-4xl opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
          ❤️
        </div>
        <div className="absolute top-[45%] left-[3%] text-white text-3xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
          💝
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-[20%] right-[15%] w-24 h-24 border-2 border-white rounded-full opacity-20 animate-spin-slow" />
        <div className="absolute top-[70%] left-[20%] w-16 h-16 border-2 border-white opacity-20 rotate-45 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        
        {/* Ellipse decoration */}
        <div className="absolute bottom-[10%] right-[25%] w-32 h-12 border-2 border-white rounded-[50%] opacity-15" />
      </div>

      {/* Progress indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 border-2 border-white transition-all duration-300 ${
              currentSection === index ? 'bg-white scale-125' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default App
