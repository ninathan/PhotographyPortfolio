import Hero from "@/src/components/Hero"
import AboutMe from "../components/AboutMe"
import AboutEquipment from "../components/AboutEquipment"
import Contact from "../components/Contact"
import ShortFormVideos from "../components/ShortFormVideos"

export default function Home() {
  return (
    <>
      <Hero />
      <ShortFormVideos />
      <AboutMe />
      <AboutEquipment />
      <Contact />
    </>
  )
}
