"use client"

import { useEffect, useState } from "react"
import { X, Play } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
/* ================= TYPES ================= */

type GalleryImage = {
  id: number
  imageUrl: string
  caption?: string
}

type GalleryVideo = {
  id: number
  youtubeUrl: string
  thumbnailUrl?: string
  title?: string
}

/* ================= PAGE ================= */

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [loading, setLoading] = useState(true)

  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [img, vid] = await Promise.all([
          fetch("/api/public/gallery/images").then((r) => r.json()),
          fetch("/api/public/gallery/videos").then((r) => r.json()),
        ])
        setImages(img)
        setVideos(vid)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <><Navbar />

    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 space-y-16">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif">Gallery</h1>
          <p className="text-muted-foreground text-lg">
            Moments of balance, breath, and awareness.
          </p>
        </div>

        {/* ================= MAIN WRAPPER ================= */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* ================= LEFT: IMAGES ================= */}
          <section className="space-y-8">
            <h2 className="text-3xl font-serif">Image Moments</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} />
                  ))
                : images.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(img)}
                      className="relative rounded-2xl overflow-hidden focus:outline-none"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.caption || "Yoga moment"}
                        className="w-full h-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </button>
                  ))}
            </div>
          </section>

          {/* ================= RIGHT: VIDEOS ================= */}
          <section className="space-y-8">
            <h2 className="text-3xl font-serif">Guided Videos</h2>

            <div className="space-y-6">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonVideo key={i} />
                  ))
                : videos.map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      className="block w-full text-left"
                    >
                      <div className="relative rounded-2xl overflow-hidden">
                        <img
                          src={vid.thumbnailUrl || "/video-placeholder.jpg"}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="text-primary ml-1" size={26} />
                          </div>
                        </div>
                      </div>
                      {vid.title && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {vid.title}
                        </p>
                      )}
                    </button>
                  ))}
            </div>
          </section>
        </div>
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {activeImage && (
        <Modal onClose={() => setActiveImage(null)}>
          <img
            src={activeImage.imageUrl}
            className="max-h-[80vh] rounded-xl"
          />
          {activeImage.caption && (
            <p className="mt-4 text-center italic text-muted-foreground">
              {activeImage.caption}
            </p>
          )}
        </Modal>
      )}

      {/* ================= VIDEO MODAL ================= */}
      {activeVideo && (
        <Modal onClose={() => setActiveVideo(null)}>
          <div className="w-full aspect-video">
            <iframe
              src={activeVideo.youtubeUrl.replace("watch?v=", "embed/")}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </Modal>
      )}
      <Footer />
    </main>
    </>
  )
}

/* ================= MODAL ================= */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-3xl p-6 max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
        >
          <X size={24} />
        </button>
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  )
}

/* ================= SKELETONS ================= */

function Skeleton() {
  return (
    <div className="aspect-square rounded-2xl bg-accent/30 animate-pulse" />
  )
}

function SkeletonVideo() {
  return (
    <div className="aspect-video rounded-2xl bg-accent/30 animate-pulse" />
  )
}
