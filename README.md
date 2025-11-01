# 🎯 BookIt — Experiences & Slots

A full‑stack booking platform for travel experiences with **real‑time slot availability**, built using **React, TypeScript, Node.js, Express, and PostgreSQL (Docker)**.

---

## ✨ Features

### 🔹 Frontend

* 🎨 **Pixel‑perfect UI** — matches Figma design
* 📱 **Fully responsive** across all screens
* ⚡ **Fast performance** powered by Vite
* 🎭 **Smooth animations** (Framer Motion + CSS)
* 🔍 **Search & filters** for experiences
* 📅 **Interactive date/time picker** with live slot status
* 💳 **Seamless checkout** with promo code validation
* 🎉 **Confetti on successful bookings**
* 🍞 **Toast notifications** for all actions

### 🔹 Backend

* 🚀 **REST API** — clean & documented
* 🔒 **Transaction safe booking** (no double‑booking)
* ✅ **Input validation** (express‑validator)
* 🐳 **PostgreSQL via Docker** (local dev)
* 🎟️ **Promo code support** (flat + percent)
* 📊 **Seed data** for demo setup

---

## 🛠️ Tech Stack

### Frontend

* React 18 + TypeScript
* Vite
* TailwindCSS
* React Router v6
* Axios
* React Hook Form + Zod
* Framer Motion
* Lucide Icons

### Backend

* Node.js + TypeScript
* Express.js
* PostgreSQL (Docker)
* Express‑Validator
* Morgan (logging)
* CORS middleware

---

## 📋 Prerequisites

* Node.js ≥ 18
* Docker & Docker Compose
* npm / yarn

---

## 🚀 Quick Setup

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Parigoyal762004/bookit-experiences.git
cd bookit-experiences
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

> Ensure `.env` DB creds match `docker-compose.yml`

### 3️⃣ Start DB & Server

```bash
cd ..
docker compose up -d
```

### 4️⃣ Seed Database

```bash
cd backend
npm run seed
```

### 5️⃣ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

> Set API base URL to `http://localhost:5000/api`

### 6️⃣ Start Frontend

```bash
npm run dev
```

➡️ App runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 🌐 API Endpoints

### Experiences

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| GET    | /api/experiences           | List experiences   |
| GET    | /api/experiences/:id       | Experience details |
| GET    | /api/experiences/:id/slots | Available slots    |

### Bookings

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/bookings        | Create booking    |
| GET    | /api/bookings/:id    | Booking details   |
| GET    | /api/bookings?email= | Bookings by email |

### Promo Codes

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | /api/promo/validate | Verify promo code |

#### 🎟️ Available Promo Codes

* `SAVE10` — 10% off
* `FLAT100` — ₹100 off
* `WELCOME20` — 20% off
* `FIRSTBOOKING` — ₹150 off
* `EARLYBIRD` — 15% off

---

## 📱 User Flow

1. Browse experiences
2. View details & pick date/time
3. Fill checkout form + apply promo
4. Confirm booking
5. View success page + booking reference

---

## 📦 Folder Structure

```
bookit-experiences/
 ├── frontend/
 │   └── src/
 │       ├── components/
 │       ├── pages/
 │       ├── services/
 │       ├── hooks/
 │       ├── types/
 │       └── utils/
 ├── backend/
 │   └── src/
 │       ├── config/
 │       ├── controllers/
 │       ├── routes/
 │       ├── middleware/
 │       ├── types/
 │       └── server.ts
 └── docker-compose.yml
```

---

## 🚢 Deployment Guide

### Backend (Render/Railway — Docker)

* **Root:** `backend/`
* Vars:

  * `DATABASE_URL`
  * `FRONTEND_URL`

### Frontend (Vercel/Netlify — Static)

* **Root:** `frontend/`
* Build: `npm run build`
* Output: `dist/`
* Env: `VITE_API_URL` = deployed backend URL

---

## 🛠️ Troubleshooting

| Issue             | Fix                                     |
| ----------------- | --------------------------------------- |
| DB not connecting | Check Docker & `.env`                   |
| Port error        | `kill` process using 5000/5173          |
| CORS issues       | Update backend `.env` & frontend `.env` |

---

## 📄 License

MIT — Free for learning & use

---

## 👤 Author

**Pari Goyal**

GitHub: `@Parigoyal762004`

Made with ❤️ and ☕ during the HD Booking Internship challenge.
