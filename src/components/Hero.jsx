"use client"
import Link from "next/link"
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-900 text-white">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to Nathan&apos;s Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Photography is my hobby, capturing moments that matter.
        </p>

        {/* Call to Action */}
        <Link 
          href="/gallery"
          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          View My Work
        </Link>

        {/* Bouncing Down Arrow */}
        <div className="mt-12 flex justify-center">
           <Link href="#about" scroll={true}>
          <ChevronDoubleDownIcon 
            className="w-10 h-10 text-white animate-bounce"
          />
          </Link>
        </div>
      </div>
      
    </main>
  )
}
