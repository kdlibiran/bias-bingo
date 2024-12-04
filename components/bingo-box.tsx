interface BingoBoxProps {
  marked: boolean
  onClick: () => void
  statement: string
}

export function BingoBox({ marked, onClick, statement }: BingoBoxProps) {
  return (
    <button
      className={`relative flex items-center justify-center w-full h-20 sm:h-32 md:h-36 text-[0.5rem] sm:text-lg md:text-xl font-bold rounded-md transition-colors duration-200 ${
        marked 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      onClick={onClick}
    >
      {marked && (
        <>
          <div className="absolute w-full h-1 bg-gray-800 transform rotate-45" />
          <div className="absolute w-full h-1 bg-gray-800 transform -rotate-45" />
        </>
      )}
      <span>{statement}</span>
    </button>
  )
}

