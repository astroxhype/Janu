import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  speed: number
  delay: number
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = [
      '#FF0066', // valentine pink
      '#FF0044', // valentine red
      '#FF99CC', // valentine light
      '#FFD700', // valentine gold
      '#FFFFFF', // white
    ]

    const newPieces: ConfettiPiece[] = []
    
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 80,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        speed: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })
    }

    setPieces(newPieces)

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setPieces([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
