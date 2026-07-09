"use client"

import { useEffect, useState } from "react"

function getVideoType(fileName) {
  const lowerName = fileName.toLowerCase()

  if (lowerName.endsWith(".mov")) return "video/quicktime"
  if (lowerName.endsWith(".webm")) return "video/webm"
  if (lowerName.endsWith(".m4v")) return "video/x-m4v"
  return "video/mp4"
}

export default function ShortFormVideoGallery({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [isLoadingVideo, setIsLoadingVideo] = useState(false)

  useEffect(() => {
    if (!activeVideo) {
      setVideoUrl("")
      setIsLoadingVideo(false)
      return
    }

    const controller = new AbortController()
    let objectUrl = ""

    async function loadVideo() {
      try {
        setIsLoadingVideo(true)
        const response = await fetch(
          `/api/videos/${encodeURIComponent(activeVideo.fileName)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`Failed to load video: ${response.status}`)
        }

        const blob = await response.blob()
        objectUrl = URL.createObjectURL(blob)
        setVideoUrl(objectUrl)
      } catch {
        setVideoUrl("")
      } finally {
        setIsLoadingVideo(false)
      }
    }

    loadVideo()

    return () => {
      controller.abort()
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [activeVideo])

  useEffect(() => {
    if (!activeVideo) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeVideo])

  return (
    <section id="videos" className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Short-form video</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Built for reels, edits, and vertical storytelling.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
            Tap any card to open the player. That keeps the grid clean while giving each clip a proper viewer for portrait or 16:9 footage.
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No video files were found in the repo root videos folder.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.fileName}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-2xl shadow-cyan-950/20 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[9/16] bg-black">
                  {activeVideo?.fileName === video.fileName ? (
                    isLoadingVideo ? (
                      <div className="flex h-full min-h-[20rem] items-center justify-center text-sm text-slate-300">
                        Loading video...
                      </div>
                    ) : videoUrl ? (
                      <>
                        <video
                          key={video.fileName}
                          className="h-full w-full object-contain"
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                          src={videoUrl}
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-2 text-xs text-white backdrop-blur transition hover:bg-black"
                          onClick={() => {
                            setActiveVideo(null)
                            setVideoUrl("")
                          }}
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <div className="flex h-full min-h-[20rem] items-center justify-center text-sm text-slate-300">
                        Video could not be loaded.
                      </div>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="relative h-full w-full"
                    >
                      <video
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        poster=""
                        onLoadedMetadata={(event) => {
                          try {
                            event.currentTarget.currentTime = 0.1
                          } catch {
                            // Ignore browsers that block seeking during preload.
                          }
                        }}
                      >
                        <source
                          src={`/api/videos/${encodeURIComponent(video.fileName)}`}
                          type={getVideoType(video.fileName)}
                        />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/35 text-2xl text-white shadow-lg backdrop-blur transition group-hover:scale-105">
                          ▶
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}