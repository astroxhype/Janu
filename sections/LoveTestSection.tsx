import { useState, useEffect, useRef } from 'react'
import { Heart, Target, Zap, Star } from 'lucide-react'

interface TestStep {
  id: number
  title: string
  instruction: string
  icon: React.ReactNode
  completed: boolean
}

const LoveTestSection = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const [testSteps, setTestSteps] = useState<TestStep[]>([
    { id: 1, title: 'TEST 01', instruction: 'CLICK THE HEART 10 TIMES', icon: <Heart className="w-8 h-8" />, completed: false },
    { id: 2, title: 'TEST 02', instruction: 'HOLD FOR 3 SECONDS', icon: <Target className="w-8 h-8" />, completed: false },
    { id: 3, title: 'TEST 03', instruction: 'DOUBLE TAP TO CONFIRM', icon: <Zap className="w-8 h-8" />, completed: false },
  ])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle heart clicks for test 1
  const handleHeartClick = () => {
    if (currentStep === 0) {
      const newCount = clickCount + 1
      setClickCount(newCount)
      
      if (newCount >= 10) {
        completeStep(0)
      }
    }
  }

  // Handle hold for test 2
  const handleMouseDown = () => {
    if (currentStep === 1) {
      setTimeout(() => {
        completeStep(1)
      }, 3000)
    }
  }

  // Handle double tap for test 3
  const handleDoubleClick = () => {
    if (currentStep === 2) {
      completeStep(2)
    }
  }

  const completeStep = (stepIndex: number) => {
    const newSteps = [...testSteps]
    newSteps[stepIndex].completed = true
    setTestSteps(newSteps)
    setShowSuccess(true)
    
    setTimeout(() => {
      setShowSuccess(false)
      if (stepIndex < testSteps.length - 1) {
        setCurrentStep(stepIndex + 1)
        setClickCount(0)
      }
    }, 1500)
  }

  const getCurrentTestContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center gap-8">
            <button
              onClick={handleHeartClick}
              className="relative group"
            >
              <Heart 
                className={`w-32 h-32 md:w-48 md:h-48 text-white transition-all duration-100 ${
                  clickCount > 0 ? 'fill-valentine-red scale-110' : 'fill-transparent'
                } group-hover:scale-110 active:scale-95`}
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 bg-valentine-red rounded-full blur-2xl opacity-40 animate-pulse" />
            </button>
            <div className="text-4xl md:text-6xl font-display text-white">
              {clickCount}/10
            </div>
          </div>
        )
      case 1:
        return (
          <div className="flex flex-col items-center gap-8">
            <button
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className="relative group px-12 py-8 border-3 border-white text-white text-2xl md:text-4xl uppercase font-display btn-fill-hover active:scale-95 transition-transform"
            >
              HOLD ME
            </button>
            <div className="text-white/60 text-sm uppercase tracking-wider">
              Keep holding for 3 seconds...
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col items-center gap-8">
            <button
              onDoubleClick={handleDoubleClick}
              className="relative group"
            >
              <Star 
                className="w-32 h-32 md:w-48 md:h-48 text-white fill-valentine-gold animate-pulse"
                strokeWidth={1.5}
              />
            </button>
            <div className="text-white/60 text-sm uppercase tracking-wider">
              Double tap the star!
            </div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center gap-8">
            <Heart className="w-32 h-32 text-white fill-valentine-red animate-heart-beat" />
            <div className="text-4xl md:text-6xl font-display text-white text-center">
              ALL TESTS
              <br />
              COMPLETED!
            </div>
          </div>
        )
    }
  }

  return (
    <section
      ref={sectionRef}
      id="love-test"
      className="relative w-screen min-h-screen flex flex-col items-center justify-center py-20"
    >
      {/* Section border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-white" />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-2 bg-valentine-gold transition-all duration-500" 
        style={{ width: `${((currentStep + 1) / testSteps.length) * 100}%` }} 
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div 
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
              {testSteps[currentStep]?.icon}
            </div>
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase">
              Love Verification System
            </span>
          </div>
          <h2 className="text-[10vw] md:text-[8vw] font-display uppercase leading-[0.9] text-white">
            {testSteps[currentStep]?.title || 'COMPLETE'}
          </h2>
        </div>

        {/* Test container */}
        <div 
          className={`relative border-3 border-white p-8 md:p-16 min-h-[50vh] flex flex-col items-center justify-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-valentine-pink border-2 border-white" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-valentine-pink border-2 border-white" />

          {/* Test instruction */}
          <div className="absolute top-4 left-4 text-white/60 text-xs uppercase tracking-wider">
            {testSteps[currentStep]?.instruction || 'LOVE VERIFIED'}
          </div>

          {/* Test content */}
          <div className="mt-8">
            {getCurrentTestContent()}
          </div>

          {/* Success overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-valentine-red/90 flex items-center justify-center animate-slide-up">
              <div className="text-center">
                <Heart className="w-24 h-24 text-white fill-white mx-auto mb-4 animate-heart-beat" />
                <div className="text-4xl md:text-6xl font-display text-white uppercase">
                  PASSED!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step indicators */}
        <div 
          className={`flex justify-center gap-4 mt-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {testSteps.map((step, index) => (
            <div
              key={step.id}
              className={`w-4 h-4 border-2 border-white transition-all duration-300 ${
                step.completed ? 'bg-white scale-125' : 
                index === currentStep ? 'bg-valentine-gold' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/10 rounded-full pointer-events-none" />
    </section>
  )
}

export default LoveTestSection
