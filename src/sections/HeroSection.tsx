import { useEffect, useRef, useState } from 'react'
import { Heart, ArrowDown } from 'lucide-react'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Trigger glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(glitchInterval)
    }
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById('love-test')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
        <div className="border-r-2 border-b-2 border-white/20" />
        <div className="border-b-2 border-white/20" />
        <div className="border-r-2 border-white/20" />
        <div />
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        
        {/* Top label */}
        <div 
          className={`absolute top-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <span className="text-white/80 text-sm tracking-[0.3em] uppercase font-heading">
            Valentine&apos;s Challenge 2026
          </span>
        </div>

        {/* Main title with distortion effect */}
        <div className="relative text-center">
          {/* Background shadow text */}
          <h1 
            className={`absolute top-1 left-1 text-[15vw] md:text-[12vw] font-display uppercase leading-[0.85] text-valentine-red transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: isVisible ? 'translate(4px, 4px)' : 'translate(0, 0)' }}
          >
            BE MY
            <br />
            VALENTINE
          </h1>

          {/* Main text with glitch effect */}
          <h1 
            className={`relative text-[15vw] md:text-[12vw] font-display uppercase leading-[0.85] text-white transition-all duration-1000 ${
              glitchActive ? 'animate-glitch' : ''
            } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            data-text="BE MY VALENTINE"
          >
            BE MY
            <br />
            VALENTINE
          </h1>
        </div>

        {/* Subtitle */}
        <div 
          className={`mt-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/90 text-lg md:text-xl tracking-wider uppercase font-heading">
            Prove Your Love • Pass The Test
          </p>
        </div>

        {/* Heart icon */}
        <div 
          className={`mt-12 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          <div className="relative">
            <Heart 
              className="w-16 h-16 md:w-24 md:h-24 text-white fill-valentine-red animate-heart-beat" 
              strokeWidth={1.5}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 bg-valentine-red rounded-full blur-xl opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Interactive button */}
        <button
          onClick={scrollToNext}
          className={`mt-16 px-8 py-4 border-3 border-white text-white text-lg uppercase tracking-wider font-heading btn-fill-hover transition-all duration-700 delay-1000 hover:shadow-brutalist-lg ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Start Challenge
        </button>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white/60 text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-5 h-5 text-white/60 animate-bounce" />
        </div>
      </div>

      {/* Decorative elements */}
      {/* Circle */}
      <div 
        className={`absolute top-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 border-2 border-white rounded-full transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
        }`}
      />

      {/* Ellipse */}
      <div 
        className={`absolute bottom-[20%] left-[8%] w-40 h-12 md:w-56 md:h-16 border-2 border-white rounded-[50%] rotate-[-15deg] transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-25 scale-100' : 'opacity-0 scale-50'
        }`}
      />

      {/* Small squares */}
      <div 
        className={`absolute top-[25%] left-[15%] w-6 h-6 border-2 border-white rotate-12 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute bottom-[30%] right-[12%] w-4 h-4 bg-white rotate-45 transition-all duration-700 delay-800 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
      />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/40" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/40" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/40" />
    </section>
  )
}

export default HeroSection
