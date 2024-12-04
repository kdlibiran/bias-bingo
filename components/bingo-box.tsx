interface BingoBoxProps {
  marked: boolean
  onClick: () => void
  statement: string
  className?: string
}

export function BingoBox({ marked, onClick, statement, className }: BingoBoxProps) {
  return (
    <button
      className={`relative flex items-center justify-center w-full h-36 text-sm font-bold rounded-md transition-colors duration-200 ${
        marked 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } ${className}`}
      onClick={onClick}
    >
      {marked && <span className="text-white">{statement}</span>}
    </button>
  )
}

