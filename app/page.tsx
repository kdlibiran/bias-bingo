'use client'

import { useState, useEffect } from 'react'
import { BingoBox } from '@/components/bingo-box'

const statements = [
  "Tattoos are unprofessional.",
  "People with tattoos are rebellious.",
  "Tattoos are only for criminals.",
  "Tattoos ruin your job prospects.",
  "Women with tattoos are less respectable.",
  "Tattoos are inappropriate for teachers or educators.",
  "Tattoos symbolize bad life choices.",
  "People with tattoos regret them later in life.",
  "Tattoos are a sign of immaturity.",
  "Tattoos make you look untrustworthy.",
  "Tattoos have no artistic value.",
  "Older people shouldn’t get tattoos.",
  "Tattoos should always be hidden in the workplace.",
  "Tattoos are a waste of money.",
  "Tattoos make people look intimidating.",
  "Tattoos are only for creative or 'artsy' people.",
  "Visible tattoos mean you don’t respect tradition.",
  "Tattoos are associated with gangs or illegal activities.",
  "Tattoos look dirty or unhygienic.",
  "Tattoos have no deep meaning.",
  "You can’t be religious and have tattoos.",
  "Tattoos make people less approachable.",
  "People with tattoos can’t work in customer service.",
  "Tattoos are only for young people.",
  "Tattoos are permanent mistakes."
];

export default function Home() {
  const [board, setBoard] = useState(Array(25).fill(false))
  const [hasBingo, setHasBingo] = useState(false)

  const handleBoxClick = (index: number) => {
    const newBoard = [...board]
    newBoard[index] = !newBoard[index]
    setBoard(newBoard)
  }

  useEffect(() => {
    const checkBingo = () => {
      // Check rows
      for (let i = 0; i < 25; i += 5) {
        if (board.slice(i, i + 5).every(box => box)) return true
      }
      // Check columns
      for (let i = 0; i < 5; i++) {
        if ([0, 1, 2, 3, 4].every(j => board[i + j * 5])) return true
      }
      // Check diagonals
      if ([0, 6, 12, 18, 24].every(i => board[i])) return true
      if ([4, 8, 12, 16, 20].every(i => board[i])) return true
      return false
    }

    setHasBingo(checkBingo())
  }, [board])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bias Bingo</h1>
      <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-lg shadow-lg">
        {board.map((marked, index) => (
          <BingoBox 
            key={index} 
            marked={marked} 
            onClick={() => handleBoxClick(index)} 
            number={index + 1}
            statement={statements[index]}
          />
        ))}
      </div>
      {hasBingo && (
        <div className="mt-4 text-xl font-bold text-green-600">
          BINGO! You've won!
        </div>
      )}
    </div>
  )
}

