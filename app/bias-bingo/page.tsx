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

const statementsWithReasons = [
  {
    "bias": "Tattoos are unprofessional.",
    "reason": "Corporate environments often associate tattoos with casualness or informality, making them seem inappropriate for professional settings."
  },
  {
    "bias": "People with tattoos are rebellious.",
    "reason": "Tattoos are historically linked to countercultures and defiance against societal norms, reinforcing the stereotype of rebellion."
  },
  {
    "bias": "Tattoos are only for criminals.",
    "reason": "In history, tattoos were used to mark prisoners or gang affiliations, leading to a persistent association with criminal behavior."
  },
  {
    "bias": "Tattoos ruin your job prospects.",
    "reason": "Employers may perceive visible tattoos as distracting or unprofessional, fearing they might affect client or customer perceptions."
  },
  {
    "bias": "Women with tattoos are less respectable.",
    "reason": "Traditional gender roles view women with tattoos as challenging expectations of modesty and respectability."
  },
  {
    "bias": "Tattoos are inappropriate for teachers or educators.",
    "reason": "Educators are seen as role models, and tattoos may be perceived as setting a bad example for students in conservative communities."
  },
  {
    "bias": "Tattoos symbolize bad life choices.",
    "reason": "The permanence of tattoos leads people to assume they are impulsive decisions reflecting poor judgment."
  },
  {
    "bias": "People with tattoos regret them later in life.",
    "reason": "The idea of changing tastes or circumstances fosters the belief that tattoos will eventually lead to regret."
  },
  {
    "bias": "Tattoos are a sign of immaturity.",
    "reason": "Visible body art is often associated with youthful experimentation or rebellion, making it seem immature to some."
  },
  {
    "bias": "Tattoos make you look untrustworthy.",
    "reason": "Media often portrays tattooed characters as villains or troublemakers, creating a stereotype of dishonesty."
  },
  {
    "bias": "Tattoos have no artistic value.",
    "reason": "People unfamiliar with tattoo art may view it as unrefined or lacking creativity compared to traditional art forms."
  },
  {
    "bias": "Older people shouldn’t get tattoos.",
    "reason": "Tattoos are seen as a trend for younger generations, with older individuals judged as trying to appear youthful or rebellious."
  },
  {
    "bias": "Tattoos should always be hidden in the workplace.",
    "reason": "Workplace dress codes often prioritize a conservative appearance, leading to the expectation of covering tattoos."
  },
  {
    "bias": "Tattoos are a waste of money.",
    "reason": "Critics may view tattoos as an unnecessary expense with no practical or lasting value."
  },
  {
    "bias": "Tattoos make people look intimidating.",
    "reason": "Bold or large tattoos can create an impression of aggressiveness, especially when they cover visible areas like arms or necks."
  },
  {
    "bias": "Tattoos are only for creative or 'artsy' people.",
    "reason": "Because tattoos are visual and expressive, they are often stereotyped as fitting creative or artistic personalities."
  },
  {
    "bias": "Visible tattoos mean you don’t respect tradition.",
    "reason": "In conservative cultures, tattoos challenge norms of conformity and are sometimes viewed as a rejection of tradition."
  },
  {
    "bias": "Tattoos are associated with gangs or illegal activities.",
    "reason": "Certain tattoo designs are linked to gang symbols, creating a broader stereotype associating tattoos with crime."
  },
  {
    "bias": "Tattoos look dirty or unhygienic.",
    "reason": "Misconceptions about the tattooing process lead people to assume tattoos are unsanitary or unsafe."
  },
  {
    "bias": "Tattoos have no deep meaning.",
    "reason": "Not all tattoos are visibly symbolic, leading some to dismiss them as superficial or meaningless."
  },
  {
    "bias": "You can’t be religious and have tattoos.",
    "reason": "Religious interpretations of body modification as desecration foster the belief that tattoos conflict with spirituality."
  },
  {
    "bias": "Tattoos make people less approachable.",
    "reason": "Visible tattoos can make people seem intimidating or unrelatable to those uncomfortable with body art."
  },
  {
    "bias": "People with tattoos can’t work in customer service.",
    "reason": "Customer-facing roles often prioritize a neutral appearance, and tattoos may be seen as distracting or unappealing."
  },
  {
    "bias": "Tattoos are only for young people.",
    "reason": "Older individuals with tattoos are often judged as trying to act younger or reliving a past trend."
  },
  {
    "bias": "Tattoos are permanent mistakes.",
    "reason": "The irreversible nature of tattoos leads to the assumption that they will eventually be regretted."
  }
]

export default function Home() {
  const [board, setBoard] = useState(Array(25).fill(false))
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
      <h1 className="text-4xl font-bold mb-8 text-center">Bias Bingo</h1>
      <h2 className="text-2xl font-bold mb-4 text-center">Instructions</h2>
      <p className="text-lg mb-4 text-center">
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
            statement={statementsWithReasons[index].bias}
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

