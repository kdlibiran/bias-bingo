'use client'

import { useState, useEffect } from 'react'
import { BingoBox } from '@/components/bingo-box'
import Image from 'next/image'

const statementsWithReasons =  [
  {
    "bias": "Tattoos are seen as unprofessional in certain environments.",
    "slide": "/slide1.png"
  },
  {
    "bias": "Tattoos are often associated with criminal behavior.",
    "slide": "/slide2.png"
  },
  {
    "bias": "People with tattoos are often perceived as less intelligent or less educated.",
    "slide": "/slide3.png"
  },
  {
    "bias": "Tattoos are seen as symbols of rebellion or defiance against authority.",
    "slide": "/slide4.png"
  },
  {
    "bias": "Free Space",
    "reason": "This space is free for all players."
  },
  {
    "bias": "Tattoos are associated with lower social classes.",
    "slide": "/slide5.png"
  },
  {
    "bias": "People with tattoos are often believed to lead unhealthy or reckless lifestyles.",
    "slide": "/slide6.png"
  },
  {
    "bias": "Women with tattoos are often viewed as less respectable or more sexualized.",
    "slide": "/slide7.png"
  },
  {
    "bias": "You can’t be religious and have tattoos.",
    "slide": "/slide8.png"
  },
]


export default function Home() {
  const [board, setBoard] = useState([false, false, false, false, true, false, false, false, false])
  const [hasBingo, setHasBingo] = useState(false)
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null)
  const [isImageOpen, setIsImageOpen] = useState(false)

  const handleBoxClick = (index: number) => {
    if(index === 4) {
      return
    }
    const newBoard = [...board]
    newBoard[index] = true
    setBoard(newBoard)
    if (statementsWithReasons[index].slide) {
      setSelectedSlide(statementsWithReasons[index].slide)
      setIsImageOpen(true)
    }
  }

  useEffect(() => {
    const checkBingo = () => {
      return board.every(box => box);
    }

    const bingo = checkBingo();
    setHasBingo(bingo);
  }, [board])

  return (
    <div className="w-full h-full relative">
      {isImageOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsImageOpen(false)}
        >
          <div 
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsImageOpen(false)} className="absolute top-2 right-2 text-white z-50">Close</button>
            <Image src={selectedSlide!} alt="Slide" layout="fill" objectFit="contain" />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-center">Bias Bingo</h1>
      {hasBingo && (
        <div className="mb-4 text-2xl font-semibold text-green-600">You&apos;ve won!</div>
      )}
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        {board.map((marked, index) => (
          <BingoBox 
            key={index} 
            marked={marked} 
            onClick={() => handleBoxClick(index)} 
            statement={statementsWithReasons[index].bias}
            className="transform transition-transform duration-200 hover:scale-105"
          />
        ))}
      </div>
      </div>
    </div>
  )
}

