"use client"

import Image from "next/image"

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/portraits/profile.jpg" // replace with your actual image path
            alt="About me photo"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Hi, I’m Nathaniel Rabanal, a third-year Information Technology student.
            I have a passion for web development and photography. Photography is a hobby of mine
            that allows me to take a break from coding and explore my creative side.
          </p>
        </div>
      </div>
    </section>
  )
}
