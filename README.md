# 🧘‍♀️ Kalindi Yoga – Full Stack Website

Kalindi Yoga is a modern, responsive full-stack website built for a professional yoga instructor.  
It includes public informational pages, class booking, gallery management, testimonials, and a secure admin dashboard.

The project focuses on **simplicity, accessibility, and usability for all age groups** while maintaining a calm, yoga-inspired design.

---

## 🌐 Live Features

### Public Website
- Responsive landing page with smooth transitions
- About page introducing the yoga instructor
- Gallery section (images & videos)
- Testimonials section (admin-controlled ordering)
- Contact form
- Book a Class form (online / offline / personal sessions)
- Shared Navbar & Footer across public pages

### Admin Dashboard
- Secure admin access
- Overview dashboard (counts for messages, bookings, gallery, testimonials)
- Manage testimonials (add, edit, reorder, show/hide, delete)
- Manage gallery
  - Upload images (Cloudinary integration)
  - Add YouTube videos with thumbnails
  - View, delete gallery items
- View & delete contact messages
- View & delete booking requests
- Mobile-responsive admin panel with sidebar navigation

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Lucide Icons**

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL (Neon DB)**

### Media Storage
- **Cloudinary** (image & thumbnail uploads)

```

## 🗄 Database Models (Prisma)

- User (Admin)
- Testimonial
- GalleryImage
- GalleryVideo
- ContactMessage
- BookingRequest

```

## 📁 Project Structure

```
app/
├─ admin/ # Admin dashboard pages
├─ api/ # API routes (admin & public)
├─ book/ # Book a class page
├─ testimonials/ # Public testimonials page
├─ about/ # About page
├─ page.tsx # Landing page
components/
├─ navbar.tsx
├─ footer.tsx
├─ ui/ # Reusable UI components
lib/
├─ prisma.ts
prisma/
├─ schema.prisma
```




## 🔐 Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```


🚀 Setup Instructions
1. Install dependencies

- npm install

2. Generate Prisma client

- npx prisma generate

3. Run database migrations

- npx prisma migrate dev

4. Start development server

- npm run dev

## 👤 Admin Usage
- Login via admin login page
- Manage all content dynamically
- Delete messages & bookings after review
- Upload images/videos without touching code

## 🎯 Design Goals
- Calm, minimal, yoga-inspired UI
- Easy navigation for all age groups
- Fully responsive (mobile, tablet, desktop)
- Simple admin experience

## 📌 Future Improvements (Optional)
- Email notifications for bookings
- SEO optimization
- Analytics dashboard
- WhatsApp integration
- Payment gateway for classes


## 👨‍💻 Developed By
Aditya Ashok Jadhav
Full-Stack Developer
MIT Chhatrapati Sambhajinagar

## 📄 License
This project is for educational and client use.
All rights reserved by the website owner.