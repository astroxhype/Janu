import { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles, Gift } from 'lucide-react'

const MessageSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [revealedLines, setRevealedLines] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const messages = [
    "HAPPY",
    "VALENTINE'S",
    "DAY"
  ]

  const subMessages = [
    "You are loved more than words can express",
    "Thank you for being in my life",
    "Forever and always ❤️"
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Reveal lines one by one
          messages.forEach((_, index) => {
            setTimeout(() => {
              setRevealedLines(prev => [...prev, index])
            }, 500 + index * 600)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Section border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white" />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-pink via-valentine-red/20 to-valentine-pink pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Main message container */}
        <div className="relative border-3 border-white p-8 md:p-16 min-h-[60vh] flex flex-col items-center justify-center">
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />

          {/* Sparkle decorations */}
          <Sparkles className="absolute top-8 left-8 w-8 h-8 text-valentine-gold animate-pulse" />
          <Sparkles className="absolute top-8 right-8 w-8 h-8 text-valentine-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-8 left-8 w-8 h-8 text-valentine-gold animate-pulse" style={{ animationDelay: '1s' }} />
          <Sparkles className="absolute bottom-8 right-8 w-8 h-8 text-valentine-gold animate-pulse" style={{ animationDelay: '1.5s' }} />

          {/* Main title with reveal animation */}
          <div className="text-center mb-12">
            {messages.map((line, index) => (
              <div
                key={index}
                className={`overflow-hidden transition-all duration-700 ${
                  revealedLines.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-full'
                }`}
              >
                <h2 
                  className="text-[15vw] md:text-[12vw] font-display uppercase leading-[0.85] text-white"
                  style={{
                    textShadow: '4px 4px 0px rgba(255, 0, 68, 0.5)',
                  }}
                >
                  {line}
                </h2>
              </div>
            ))}
          </div>

          {/* Heart separator */}
          <div 
            className={`flex items-center gap-4 mb-12 transition-all duration-700 delay-2000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            <div className="w-16 md:w-32 h-[2px] bg-white/40" />
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-white fill-valentine-red animate-heart-beat" />
            <div className="w-16 md:w-32 h-[2px] bg-white/40" />
          </div>

          {/* Sub messages */}
          <div 
            className={`text-center space-y-4 transition-all duration-700 delay-2200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subMessages.map((msg, index) => (
              <p 
                key={index}
                className="text-lg md:text-2xl text-white/90 font-heading tracking-wide"
                style={{ 
                  transitionDelay: `${2400 + index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.7s ease-out'
                }}
              >
                {msg}
              </p>
            ))}
          </div>

          {/* Gift box decoration */}
          <div 
            className={`mt-12 transition-all duration-700 delay-3000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              <Gift className="w-16 h-16 md:w-24 md:h-24 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-valentine-gold rounded-full flex items-center justify-center text-valentine-pink text-xs font-bold">
                ❤️
              </div>
            </div>
          </div>
        </div>

        {/* Floating hearts around the section */}
        <div className="absolute top-[20%] left-[5%] text-4xl animate-float opacity-30">
          ❤️
        </div>
        <div className="absolute top-[30%] right-[8%] text-3xl animate-float opacity-20" style={{ animationDelay: '1s' }}>
          💕
        </div>
        <div className="absolute bottom-[25%] left-[10%] text-5xl animate-float opacity-25" style={{ animationDelay: '2s' }}>
          💗
        </div>
        <div className="absolute bottom-[20%] right-[5%] text-4xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>
          ❤️
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[15%] right-[15%] w-24 h-24 border-2 border-white/20 rounded-full" />
      <div className="absolute bottom-[15%] left-[10%] w-32 h-32 border-2 border-white/20 rounded-full" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  )
}

export default MessageSection
