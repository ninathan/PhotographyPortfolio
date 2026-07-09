import fs from "fs"
import path from "path"
import { Readable } from "stream"

const mimeTypes = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".m4v": "video/x-m4v",
}

function getContentType(fileName) {
  const extension = path.extname(fileName).toLowerCase()
  return mimeTypes[extension] || "application/octet-stream"
}

function getRangeHeaders(request, fileSize) {
  const rangeHeader = request.headers.get("range")

  if (!rangeHeader) {
    return null
  }

  const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader)

  if (!match) {
    return null
  }

  const start = Number(match[1])
  const end = match[2] ? Number(match[2]) : fileSize - 1

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= fileSize) {
    return null
  }

  return {
    start,
    end: Math.min(end, fileSize - 1),
  }
}

export async function GET(request, { params }) {
  const videosDir = path.join(process.cwd(), "videos")
  const fileName = path.basename(params.filename)
  const filePath = path.join(videosDir, fileName)

  if (!fs.existsSync(filePath)) {
    return new Response("Video not found", { status: 404 })
  }

  const fileSize = fs.statSync(filePath).size
  const range = getRangeHeaders(request, fileSize)
  const headers = {
    "Accept-Ranges": "bytes",
    "Content-Type": getContentType(fileName),
    "Cache-Control": "public, max-age=3600",
  }

  if (range) {
    const chunkSize = range.end - range.start + 1
    const fileStream = fs.createReadStream(filePath, {
      start: range.start,
      end: range.end,
    })

    headers["Content-Range"] = `bytes ${range.start}-${range.end}/${fileSize}`
    headers["Content-Length"] = String(chunkSize)

    return new Response(Readable.toWeb(fileStream), {
      status: 206,
      headers,
    })
  }

  const fileStream = fs.createReadStream(filePath)
  headers["Content-Length"] = String(fileSize)

  return new Response(Readable.toWeb(fileStream), {
    headers,
  })
}