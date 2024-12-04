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

const statements = [
  `Tattoos are unprofessional.`,
  `People with tattoos are rebellious.`,
  `Tattoos are only for criminals.`,
  `Tattoos ruin your job prospects.`,
  `Women with tattoos are less respectable.`,
  `Tattoos are inappropriate for teachers or educators.`,
  `Tattoos symbolize bad life choices.`,
  `People with tattoos regret them later in life.`,
  `Tattoos are a sign of immaturity.`,
  `Tattoos make you look untrustworthy.`,
  `Tattoos have no artistic value.`,
  `Older people shouldn't get tattoos.`,
  `Tattoos should always be hidden in the workplace.`,
  `Tattoos are a waste of money.`,
  `Tattoos make people look intimidating.`,
  `Tattoos are only for creative or artsy people.`,
  `Visible tattoos mean you don't respect tradition.`,
  `Tattoos are associated with gangs or illegal activities.`,
  `Tattoos look dirty or unhygienic.`,
  `Tattoos have no deep meaning.`,
  `You can't be religious and have tattoos.`,
  `Tattoos make people less approachable.`,
  `People with tattoos can't work in customer service.`,
  `Tattoos are only for young people.`,
  `Tattoos are permanent mistakes.`
];

const reasons = [
  "Corporate dress codes often prioritize a 'clean' appearance, equating visible tattoos with casualness or informality.",
  "Tattoos have been symbols of defiance in youth culture and rebellion against societal norms.",
  "Historically, tattoos were used to mark prisoners in some cultures, linking them to criminality.",
  "Some employers see tattoos as unprofessional or distracting in customer-facing roles.",
  "Traditional gender roles associate women with purity or modesty, making tattoos appear rebellious or provocative.",
  "Educators are expected to be 'role models,' and tattoos might be seen as setting a 'bad example' for students.",
  "Tattoos are often seen as impulsive decisions due to their permanence, symbolizing lack of foresight.",
  "Tattoos were historically associated with certain subcultures, creating a perception of immaturity.",
  "Media often portrays tattooed characters as villains or untrustworthy individuals.",
  "People who don't consider tattoos as art see them as unrefined or meaningless scribbles.",
  "Society often views older people with tattoos as out of place or trying to appear younger.",
  "Traditional workplaces value conformity, where tattoos are perceived as inappropriate.",
  "Tattoos can be seen as extravagant, with critics viewing them as a waste of money.",
  "Large or bold tattoos might be interpreted as aggressive or intimidating.",
  "Creative or artsy people are more likely associated with tattoos due to their visual nature.",
  "Tattoos challenge cultural norms in conservative societies, leading to the perception of disrespect.",
  "Some tattoos have been co-opted by gangs, creating a lingering association.",
  "Misconceptions about hygiene during tattooing lead to views of tattoos being unsanitary.",
  "People assume tattoos are done without deep thought or purpose.",
  "Religious interpretations of tattoos as desecrating the 'body as a temple' lead to discrimination.",
  "Tattoos can make people appear unapproachable to those uncomfortable with visible body art.",
  "Tattoos in customer service are sometimes seen as distracting or unprofessional.",
  "Older generations often view tattoos as a 'young person's trend,' dismissing them for older people.",
  "Many see tattoos as permanent regrets due to changing tastes or circumstances.",
  "Tattoos' historical association with punishment or marginalization contributes to their stigma."
];

export default function Home() {
  const [board, setBoard] = useState(Array(25).fill(false))
  const [hasBingo, setHasBingo] = useState(false)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleBoxClick = (index: number) => {
    const newBoard = [...board]
    newBoard[index] = !newBoard[index]
    setBoard(newBoard)
    setSelectedReason(reasons[index])
    setIsDialogOpen(true)
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

    const bingo = checkBingo();
    setHasBingo(bingo);
    if (bingo) {
      setIsDialogOpen(true);
    }
  }, [board])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bias Bingo</h1>
      <h2 className="text-2xl font-bold mb-4">Instructions</h2>
      <p className="text-lg mb-4">
        Click on the statements that you have heard before.
      </p>
      {hasBingo && (
        <div className="mb-4 text-2xl font-semibold text-green-600">You&apos;ve won!</div>
      )}
      <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        {board.map((marked, index) => (
          <BingoBox 
            key={index} 
            marked={marked} 
            onClick={() => handleBoxClick(index)} 
            statement={statements[index]}
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

