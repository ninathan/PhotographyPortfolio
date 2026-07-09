import fs from "fs"
import path from "path"
import ShortFormVideoGallery from "./ShortFormVideoGallery"

const videoTitleMap = {
  "AQO0hlSSH04CCqMRhi1t24X6sgUDK4bSgR0wVw3dow3O8wlXxU5zCfIsPw8Agu50Tde9aN7p3bJDkLzHVjGfl4LqzXfqp6ju838.mp4": "Night drive reel",
  "VID_20260121_072755_398_bsl.mp4": "Street moments",
  "compose_video_1771773062745 (1).mp4": "Cinematic edit",
  "compose_video_1768657906518.mp4": "Travel cutdown",
  "compose_video_1768393804520.mp4": "Detail reel",
  "compose_video_1767768247366.mp4": "Behind the scenes",
  "AQPHsBuNMUYHDjG-zKecFxs6nUH-6bgxCOl3okOeqssiuPHBJm9gmn8IFP4Fb19I3NvIuUzxfYXswblj6AgxTTVQpozervloBsE.mp4": "Portrait motion",
  "AQPeYhyB_eJmjf6j8P0LzGTB90H95qbjoCfYv3b4ub6g7gPDxYBcyChFq1Ouwbd0R7PvsrG2HCYqJUYn8FqthScGZCMHgWiPMug.mp4": "Short-form highlight",
  "AQPBwipjlWlyfQi15hk9wEw6ZfE_jM9Ow0rD4ImlEQPfSGo05XqwZErnEgn4lBMUdHpImJqPsHCRyC5Y9xnFWQmdJsBq7cE56OU.mp4": "Run and gun reel",
  "AQP51uddgXLsa170xWBVlN83pJ2wSDUmrXY2FHx3FEcuShpHPCnaCaXnZj_JfR1N-Nh3S7oP2JUmJAhuR2spMqzFqd0F1V5g1AE.mp4": "Final cut",
}

function formatLabel(fileName) {
  return (
    videoTitleMap[fileName] ||
    fileName
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  )
}

export default function ShortFormVideos() {
  const videosDir = path.join(process.cwd(), "videos")
  const files = fs.existsSync(videosDir)
    ? fs
        .readdirSync(videosDir)
        .filter((file) => /\.(mp4|mov|webm|m4v)$/i.test(file))
        .sort((first, second) => first.localeCompare(second))
    : []

  const videos = files.map((fileName, index) => ({
    fileName,
    title: formatLabel(fileName),
    index,
  }))

  return <ShortFormVideoGallery videos={videos} />
}
