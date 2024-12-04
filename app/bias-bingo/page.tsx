'use client'

import { useState, useEffect } from 'react'
import { BingoBox } from '@/components/bingo-box'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const statementsWithReasons =  [
  {
    "bias": "Tattoos are seen as unprofessional in certain environments.",
    "reason": "Many people believe tattoos conflict with corporate dress codes and professional norms, although this perception is gradually changing in more modern and creative industries."
  },
  {
    "bias": "Tattoos are often associated with criminal behavior.",
    "reason": "Tattoos have historically been linked to gangs or marginalized groups, but this stereotype is increasingly being challenged as tattoos become more widely accepted as a form of self-expression and art."
  },
  {
    "bias": "People with tattoos are often perceived as less intelligent or less educated.",
    "reason": "There's a societal bias that assumes individuals with tattoos lack professionalism or education, even though many highly educated and successful people choose to get tattoos."
  },
  {
    "bias": "Tattoos are seen as symbols of rebellion or defiance against authority.",
    "reason": "Tattoos are often viewed as a form of protest or resistance to societal norms, especially in conservative or traditional cultures."
  },
  {
    "bias": "Free Space",
    "reason": "This space is free for all players."
  },
  {
    "bias": "Tattoos are associated with lower social classes.",
    "reason": "Tattoos have traditionally been linked to working-class or marginalized groups, but this association is breaking down as tattoos gain popularity across all social and economic backgrounds."
  },
  {
    "bias": "People with tattoos are often believed to lead unhealthy or reckless lifestyles.",
    "reason": "Some people assume that getting tattoos indicates a non-conformist or irresponsible lifestyle, even though many tattooed individuals live healthy, balanced lives."
  },
  {
    "bias": "Women with tattoos are often viewed as less respectable or more sexualized.",
    "reason": "Society often judges women with tattoos as being less respectable or more rebellious, and their tattoos may be unfairly sexualized or associated with non-conformity."
  },
  {
    "bias": "You can’t be religious and have tattoos.",
    "reason": "There's a belief that tattoos conflict with religious values or teachings, although many religious individuals choose to get tattoos that have personal or spiritual meaning."
  },
]


export default function Home() {
  const [board, setBoard] = useState([false, false, false, false, true, false, false, false, false])
  const [hasBingo, setHasBingo] = useState(false)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleBoxClick = (index: number) => {
    const newBoard = [...board]
    newBoard[index] = !newBoard[index]
    setBoard(newBoard)
    setSelectedReason(statementsWithReasons[index].reason)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    const checkBingo = () => {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (board.slice(i * 3, i * 3 + 3).every(box => box)) return true
      }
      // Check columns
      for (let i = 0; i < 3; i++) {
        if ([0, 3, 6].every(j => board[i + j])) return true
      }
      // Check diagonals
      if ([0, 4, 8].every(i => board[i])) return true
      if ([2, 4, 6].every(i => board[i])) return true
      return false
    }

    const bingo = checkBingo();
    setHasBingo(bingo);
    if (bingo) {
      setIsDialogOpen(true);
    }
  }, [board])

  return (
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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{"Reason"}</DialogTitle>
            <DialogDescription className="text-lg">
              {selectedReason}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

