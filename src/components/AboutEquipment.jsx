"use client"

import Image from "next/image"

export default function AboutEquipment() {
  return (
    <section id="equipment" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Equipment Image */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/portraits/equipment.jpg" // 👈 place your equipment photo in public/portraits/
            alt="My equipment"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Equipment</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I’ve collected gear that helps me bring my ideas to
            life. From a reliable camera and lenses to my editing setup, every
            piece of equipment plays a role in my creative process. I have two DSLR cameras: Nikon D3100 and Nikon D5100
            both have Nikon 18-55mm f/3.5-5.6G VR lenses. For editing, I use a laptop with Adobe Photoshop.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
           When I am on the go, I use my Samsung S22 Ultra for quick shots and spontaneous moments. It has allowed me to capture high-quality images without the need for bulky gear.
          </p>
        </div>
      </div>
    </section>
  )
}
