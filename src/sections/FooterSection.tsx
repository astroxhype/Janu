import { useState, useEffect, useRef } from 'react'
import { Heart, Share2, Copy, Check } from 'lucide-react'

const FooterSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Be My Valentine',
          text: 'Happy Valentine\'s Day! 💕',
          url: url,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.log('Copy failed')
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('Copy failed')
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-[50vh] flex flex-col items-center justify-center py-16"
    >
      {/* Section border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Share section */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-3xl md:text-5xl font-display text-white uppercase mb-4">
            SHARE THE LOVE
          </h3>
          <p className="text-white/70 text-lg mb-8">
            Spread the love with someone special
          </p>

          {/* Share buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white btn-fill-hover transition-all hover:shadow-brutalist"
            >
              <Share2 className="w-5 h-5" />
              <span className="uppercase tracking-wider">Share</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white btn-fill-hover transition-all hover:shadow-brutalist"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="uppercase tracking-wider">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="uppercase tracking-wider">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div 
          className={`w-full h-[2px] bg-white/20 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        {/* Footer content */}
        <div 
          className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-white fill-valentine-red" />
            <span className="text-white font-display text-xl uppercase tracking-wider">
              Be My Valentine
            </span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-white/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-valentine-red fill-valentine-red animate-heart-beat" />
            <span>for Valentine&apos;s Day 2026</span>
          </div>

          {/* Year badge */}
          <div className="px-4 py-2 border border-white/40 text-white/60 text-sm">
            2026
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div 
          className={`flex justify-center gap-8 mt-12 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {['❤️', '💕', '💗', '💝', '💖'].map((emoji, index) => (
            <span 
              key={index}
              className="text-2xl animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
    </section>
  )
}

export default FooterSection
