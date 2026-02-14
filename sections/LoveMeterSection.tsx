import { useState, useEffect, useRef } from 'react'
import { Heart, TrendingUp } from 'lucide-react'

const LoveMeterSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [lovePercentage, setLovePercentage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const startAnimation = () => {
    setIsAnimating(true)
    let current = 0
    const target = 100
    const duration = 2000
    const increment = target / (duration / 16)

    const animate = () => {
      current += increment
      if (current < target) {
        setLovePercentage(Math.floor(current))
        requestAnimationFrame(animate)
      } else {
        setLovePercentage(target)
        setIsAnimating(false)
      }
    }

    setTimeout(() => {
      requestAnimationFrame(animate)
    }, 500)
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Section border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div 
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase">
              Love Analysis Complete
            </span>
          </div>
          <h2 className="text-[12vw] md:text-[10vw] font-display uppercase leading-[0.9] text-white">
            LOVE METER
          </h2>
        </div>

        {/* Love meter display */}
        <div 
          className={`relative border-3 border-white p-8 md:p-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />

          {/* Percentage display */}
          <div className="flex flex-col items-center">
            {/* Large percentage */}
            <div className="relative mb-8">
              <span 
                className={`text-[25vw] md:text-[20vw] font-display text-white leading-none transition-all duration-100 ${
                  isAnimating ? 'scale-110' : 'scale-100'
                }`}
              >
                {lovePercentage}
              </span>
              <span className="absolute top-4 -right-8 md:-right-16 text-[8vw] md:text-[6vw] font-display text-white">
                %
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-2xl h-8 md:h-12 border-2 border-white relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-valentine-red via-valentine-pink to-valentine-gold transition-all duration-100"
                style={{ width: `${lovePercentage}%` }}
              />
              {/* Shine effect */}
              <div 
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-in-right"
                style={{ 
                  left: `${lovePercentage - 20}%`,
                  animation: isAnimating ? 'none' : 'slide-in-right 1s ease-in-out infinite'
                }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between w-full max-w-2xl mt-4 text-white/60 text-sm uppercase tracking-wider">
              <span>Friend Zone</span>
              <span>Crush</span>
              <span>True Love</span>
            </div>
          </div>

          {/* Heart decorations around the meter */}
          <div className="absolute top-8 left-8 text-4xl animate-float" style={{ animationDelay: '0s' }}>
            ❤️
          </div>
          <div className="absolute top-8 right-8 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
            💕
          </div>
          <div className="absolute bottom-8 left-8 text-3xl animate-float" style={{ animationDelay: '1s' }}>
            💗
          </div>
          <div className="absolute bottom-8 right-8 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>
            ❤️
          </div>
        </div>

        {/* Result message */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-1000 ${
            lovePercentage === 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border-2 border-white">
            <Heart className="w-8 h-8 text-white fill-valentine-red animate-heart-beat" />
            <span className="text-2xl md:text-4xl font-display text-white uppercase">
              TRUE LOVE CONFIRMED
            </span>
            <Heart className="w-8 h-8 text-white fill-valentine-red animate-heart-beat" />
          </div>
        </div>

        {/* Stats grid */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 transition-all duration-700 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Romance', value: '100%' },
            { label: 'Passion', value: '100%' },
            { label: 'Devotion', value: '100%' },
            { label: 'Chemistry', value: '100%' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="border-2 border-white p-4 text-center"
              style={{ transitionDelay: `${1400 + index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-display text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background circles */}
      <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-white/20 rounded-full" />
      <div className="absolute bottom-1/4 right-[10%] w-48 h-48 border border-white/20 rounded-full" />
      <div className="absolute top-1/2 right-[20%] w-24 h-24 border border-white/10 rounded-full" />
    </section>
  )
}

export default LoveMeterSection
