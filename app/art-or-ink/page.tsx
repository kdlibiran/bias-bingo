'use client'

import { useState } from 'react'
import Image from 'next/image'

const images = [
  { src: '/grrr.jpg', alt: 'Image 1' },
  { src: '/kobe.jpg', alt: 'Image 2' },
  { src: '/kalinga.jpg', alt: 'Image 3' },
  { src: '/pikachu.jpg', alt: 'Image 4' },
  { src: '/tree.jpg', alt: 'Image 5' },
]

export default function ArtOrInk() {
  const [currentImage, setCurrentImage] = useState(0)
  const [choices, setChoices] = useState<boolean[]>([])
  const [gameOver, setGameOver] = useState(false)

  const handleChoice = (isArt: boolean) => {
    const newChoices = [...choices, isArt]
    setChoices(newChoices)

    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    } else {
      setGameOver(true)
    }
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">Results</h1>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Art</h2>
            {choices.map((choice, index) => 
              choice && (
                <div key={index} className="mb-4">
                  <Image src={images[index].src} alt={images[index].alt} width={150} height={150} />
                </div>
              )
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Ink</h2>
            {choices.map((choice, index) => 
              !choice && (
                <div key={index} className="mb-4">
                  <Image src={images[index].src} alt={images[index].alt} width={150} height={150} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Art or Ink?</h1>
      <div className="mb-8">
        <Image src={images[currentImage].src} alt={images[currentImage].alt} width={300} height={300} />
      </div>
      <div className="space-x-4">
        <button 
          onClick={() => handleChoice(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Art
        </button>
        <button 
          onClick={() => handleChoice(false)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Ink
        </button>
      </div>
    </div>
  )
}

