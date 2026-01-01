"use client"

import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  Star,
  LogOut,
  Menu,
  NotebookPen,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* MAIN DASHBOARD */

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/"
  }

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "testimonials", icon: Star, label: "Testimonials" },
    { id: "gallery", icon: ImageIcon, label: "Gallery" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "Booking", icon: NotebookPen, label: "Bookings" },
  ]

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white/90 backdrop-blur border-r border-primary/5
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="p-6 flex flex-col space-y-8 h-full">
          <div className="text-2xl font-serif italic text-primary font-bold">
            Kalindi Yoga Admin
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${activeTab === item.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-primary"
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto md:ml-64">
        {/* Header */}
        <header className="h-20 px-4 md:px-8 flex justify-between items-center border-b border-primary/5 bg-white/30 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-accent/50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="hidden sm:flex items-center gap-3 bg-accent/20 px-4 py-2 rounded-2xl">
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              K
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {activeTab === "dashboard" && <Overview />}
          {activeTab === "testimonials" && <ManageTestimonials />}
          {activeTab === "gallery" && <ManageGallery />}
          {activeTab === "messages" && <ViewMessages />}
          {activeTab === "Booking" && <ViewBookings />}
        </div>
      </main>
    </div>
  )
}

/* ========================== OVERVIEW =============================== */

function Overview() {
  const [stats, setStats] = useState({
    messages: 0,
    testimonials: 0,
    gallery: 0,
    bookings: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [m, t, g, b] = await Promise.all([
          fetch("/api/admin/messages").then((r) => r.ok ? r.json() : []),
          fetch("/api/admin/testimonials").then((r) => r.ok ? r.json() : []),
          fetch("/api/admin/gallery/images").then((r) => r.ok ? r.json() : []),
          fetch("/api/admin/bookings").then((r) => r.ok ? r.json() : []),
        ])

        setStats({
          messages: m.length,
          testimonials: t.length,
          gallery: g.length,
          bookings: b.length,
        })
      } catch (e) {
        console.error(e)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <StatCard label="Messages" value={stats.messages} icon={MessageSquare} />
      <StatCard label="Testimonials" value={stats.testimonials} icon={Star} />
      <StatCard label="Gallery Assets" value={stats.gallery} icon={ImageIcon} />
      <StatCard label="Bookings" value={stats.bookings} icon={NotebookPen} />
    </div>
  )
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="admin-card">
      <div className="flex justify-between mb-4">
        <span className="text-muted-foreground">{label}</span>
        <Icon />
      </div>
      <div className="text-4xl font-serif">{value}</div>
    </div>
  )
}
/* =============================================== TESTIMONIALS ================================= */
function ManageTestimonials() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    const res = await fetch("/api/admin/testimonials")
    setItems(await res.json())
  }

  useEffect(() => {
    load()
  }, [])

  const nextOrder = () =>
    items.length ? Math.max(...items.map((i) => i.order)) + 1 : 1

  /* ================= ADD / EDIT ================= */

  const save = async () => {
    if (!name || !message) return alert("Name & message required")

    const payload = {
      name,
      rating,
      message,
      order: editingId ? undefined : nextOrder(),
      isVisible: true,
    }

    await fetch(
      editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    setName("")
    setRating(5)
    setMessage("")
    setEditingId(null)
    load()
  }

  /* =============================== ORDER ================================== */

  const updateOrder = async (id: number, order: number) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    })
  }

  const move = async (index: number, dir: "up" | "down") => {
    const current = items[index]
    const target = dir === "up" ? items[index - 1] : items[index + 1]
    if (!target) return

    await updateOrder(current.id, target.order)
    await updateOrder(target.id, current.order)
    load()
  }

  /* ==================================== VISIBILITY ================= */

  const toggleVisibility = async (id: number, value: boolean) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: value }),
    })
    load()
  }

  /* ======================= DELETE ================= */

  const remove = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
    load()
  }
  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-serif">Testimonials</h2>

      {/* ADD / EDIT FORM */}
      <div className="admin-card space-y-4">
        <input
          className="admin-input"
          placeholder="Client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="admin-input"
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
        />

        <textarea
          className="admin-input"
          placeholder="Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={save}>
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {items.map((t, i) => (
          <div key={t.id} className="admin-card flex gap-6 items-start">
            <div className="text-2xl font-serif text-primary">{i + 1}</div>

            <div className="flex-1">
              <h4 className="font-medium">{t.name}</h4>
              <p className="italic text-muted-foreground">“{t.message}”</p>
              <p className="text-xs text-muted-foreground">
                {t.isVisible ? "Visible" : "Hidden"}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => move(i, "up")} disabled={i === 0}>↑</button>
              <button onClick={() => move(i, "down")} disabled={i === items.length - 1}>↓</button>

              <button
                onClick={() => {
                  setEditingId(t.id)
                  setName(t.name)
                  setMessage(t.message)
                  setRating(t.rating || 5)
                }}
              >
                Edit
              </button>

              <button onClick={() => toggleVisibility(t.id, !t.isVisible)}>
                {t.isVisible ? "Hide" : "Show"}
              </button>

              <button onClick={() => remove(t.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ManageGallery() {
  const [images, setImages] = useState<any[]>([])
  const [videos, setVideos] = useState<any[]>([])

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [uploading, setUploading] = useState(false)

  const [videoUrl, setVideoUrl] = useState("")
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [videoUploading, setVideoUploading] = useState(false)

  /* ==================== LOAD =================== */

  const loadGallery = async () => {
    const [img, vid] = await Promise.all([
      fetch("/api/admin/gallery/images").then((r) => r.json()),
      fetch("/api/admin/gallery/videos").then((r) => r.json()),
    ])
    setImages(img)
    setVideos(vid)
  }

  useEffect(() => {
    loadGallery()
  }, [])

  /* ============================== CLOUDINARY ==================== */

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("Upload failed")
    return (await res.json()).url
  }

  /* ================================== IMAGE ================== */

  const addImage = async () => {
    if (!imageFile) return alert("Select an image")

    setUploading(true)

    try {
      const imageUrl = await uploadToCloudinary(imageFile)

      await fetch("/api/admin/gallery/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          caption,
          order: images.length + 1,
          isVisible: true,
        }),
      })

      setImageFile(null)
      setCaption("")
      loadGallery()
    } catch {
      alert("Image upload failed")
    } finally {
      setUploading(false)
    }
  }

  /* =================== VIDEO =================================== */

  const addVideo = async () => {
    if (!videoUrl) return alert("YouTube URL required")

    setVideoUploading(true)

    try {
      let thumbnailUrl = null
      if (thumbFile) thumbnailUrl = await uploadToCloudinary(thumbFile)

      await fetch("/api/admin/gallery/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl: videoUrl,
          thumbnailUrl,
          order: videos.length + 1,
          isVisible: true,
        }),
      })

      setVideoUrl("")
      setThumbFile(null)
      loadGallery()
    } catch {
      alert("Video save failed")
    } finally {
      setVideoUploading(false)
    }
  }

  /* ==================== DELETE ================================ */

  const remove = async (type: "image" | "video", id: number) => {
    if (!confirm("Delete this item?")) return

    await fetch(`/api/admin/gallery/${type}s/${id}`, { method: "DELETE" })
    loadGallery()
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* ========================= LEFT: IMAGES ================================= */}
      <section className="space-y-8">
        <h2 className="text-3xl font-serif">Images</h2>

        {/* Add Image */}
        <div className="admin-card space-y-4">
          <input
            type="file"
            accept="image/*"
            className="admin-input"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <input
            className="admin-input"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Button onClick={addImage} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload Image"}
          </Button>
        </div>

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {images.map((img) => (
            <div key={img.id} className="admin-card space-y-3">
              <img
                src={img.imageUrl}
                className="rounded-xl aspect-video object-cover"
              />
              <p className="text-sm italic">
                {img.caption || "No caption"}
              </p>
              <div className="flex justify-between text-sm">
                <span>{img.isVisible ? "Visible" : "Hidden"}</span>
                <button
                  onClick={() => remove("image", img.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RIGHT: VIDEOS ==================================== */}
      <section className="space-y-8">
        <h2 className="text-3xl font-serif">Videos</h2>

        {/* Add Video */}
        <div className="admin-card space-y-4">
          <input
            className="admin-input"
            placeholder="YouTube URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="admin-input"
            onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
          />

          <Button onClick={addVideo} disabled={videoUploading}>
            {videoUploading ? "Saving…" : "Add Video"}
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((vid) => (
            <div key={vid.id} className="admin-card space-y-3">
              <img
                src={vid.thumbnailUrl || "/video-placeholder.jpg"}
                className="rounded-xl aspect-video object-cover"
              />
              <p className="text-sm truncate">
                {vid.youtubeUrl}
              </p>
              <div className="flex justify-between text-sm">
                <span>{vid.isVisible ? "Visible" : "Hidden"}</span>
                <button
                  onClick={() => remove("video", vid.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}



/* =========================== MESSAGES ====================================== */

function ViewMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState<number | null>(null)

  const loadMessages = async () => {
    const res = await fetch("/api/admin/messages")
    setMessages(await res.json())
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const deleteMessage = async (id: number) => {
    const ok = confirm("Delete this message permanently?")
    if (!ok) return

    setLoading(id)

    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    })

    setLoading(null)
    loadMessages()
  }
  return (
    <div className="space-y-8 animate-in fade-in">
      <h2 className="text-4xl font-serif">Contact Messages</h2>

      {messages.length === 0 && (
        <p className="text-muted-foreground italic">
          No messages yet.
        </p>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className="admin-card space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-xl font-serif">{msg.name}</h4>
              <p className="text-xs text-muted-foreground">{msg.email}</p>
            </div>

            <button
              onClick={() => deleteMessage(msg.id)}
              disabled={loading === msg.id}
              className="text-red-600 text-sm hover:underline disabled:opacity-50"
            >
              {loading === msg.id ? "Deleting..." : "Delete"}
            </button>
          </div>

          <p className="italic text-foreground/80 leading-relaxed">
            “{msg.message}”
          </p>

          <p className="text-xs text-muted-foreground">
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
  /* =========================== BOOKINGS ================================ */
  function ViewBookings() {


    const loadBookings = async () => {
  const res = await fetch("/api/admin/bookings")

  if (!res.ok) {
    setBookings([])
    return
  }

  const text = await res.text()


  if (!text) {
    setBookings([])
    return
  }
  setBookings(JSON.parse(text))
}
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState<number | null>(null)

    useEffect(() => {
      loadBookings()
    }, [])

    const deleteBooking = async (id: number) => {
      const ok = confirm("Delete this booking request?")
      if (!ok) return

      setLoading(id)
      await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" })
      setLoading(null)
      loadBookings()
    }

    return (
      <div className="space-y-8">
        <h2 className="text-4xl font-serif">Booking Requests</h2>

        {bookings.length === 0 && (
          <p className="text-muted-foreground italic">
            No booking requests yet.
          </p>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            className="admin-card space-y-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h4 className="text-xl font-serif">{b.name}</h4>
                <p className="text-sm text-muted-foreground">{b.email}</p>
                {b.phone && (
                  <p className="text-sm text-muted-foreground">
                    📞 {b.phone}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteBooking(b.id)}
                disabled={loading === b.id}
                className="text-red-600 text-sm hover:underline disabled:opacity-50"
              >
                {loading === b.id ? "Deleting..." : "Delete"}
              </button>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              {b.classType && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {b.classType}
                </span>
              )}
            </div>

            {b.message && (
              <p className="italic text-foreground/80 leading-relaxed">
                “{b.message}”
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              {new Date(b.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )
  }


