import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Game Selection</h1>
      <div className="space-y-4">
        <Link href="/bias-bingo" className="block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Play Bias Bingo
        </Link>
        <Link href="/art-or-ink" className="block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          Play Art or Ink
        </Link>
      </div>
    </main>
  )
}

