## 🔗 Live Demo

[View the App](YOUR_VERCEL_URL_HERE)

# 🚀 AI-Augmented Software Engineer Bootcamp App

A 12-week structured training system designed to rapidly build real-world software engineering skills through intentional practice, project-based learning, and AI-assisted workflows.

This app functions as a **personal training dashboard**, **project tracker**, and **skill development system**.

---

## ✨ Features

### 🧠 Structured 12-Week Curriculum
- Weekly focus areas (frontend, backend, system design, AI engineering)
- Clear progression from fundamentals → advanced concepts
- Built to simulate real-world engineering growth

---

### 📅 Daily Cadence System
Each day follows a proven learning loop:

- **Recall (20 min)** – write what you remember
- **Learn (40 min)** – study one focused concept
- **Build (45 min)** – apply immediately in code
- **Explain (15 min)** – teach it back in your own words

---

### ✅ Goals & Lessons Tracking
- Checklist-based progress tracking
- Reinforces consistency and accountability
- Stored locally in browser (no backend required)

---

### 💻 Code / Example Section
- Provides a focused coding prompt or snippet
- Designed for:
  - debugging practice
  - logic improvement
  - engineering thinking

💡 **Tip:** Don’t just read — break, fix, and explain.

---

### 📦 GitHub Project Tracker

Track your portfolio projects in one place:

- Add GitHub repo URLs
- Auto-extract repo name from URL
- Track project status:
  - Planned
  - In Progress
  - Polishing
  - Complete
- Set completion % with slider
- “Open Repo” button
- Automatic **last updated timestamp**

👉 All data is saved in **localStorage**

---

### 💾 Local Persistence
- No login required
- No database required
- Progress is saved automatically in your browser

---

## 🛠 Tech Stack

- **React (Vite)**
- **Tailwind CSS (v4 via Vite plugin)**
- **Framer Motion**
- LocalStorage (for persistence)

---

## ⚡ Getting Started (Fresh Install)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
---

### 2. Install dependencies

```bash
npm install
```
---

### 3. Install required packages

```bash
npm install framer-motion
npm install -D tailwindcss @tailwindcss/vite
```
---

### 4. Configure Vite (Tailwind)

Open vite.config.js and update:

```JavaScript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
---

### 5. Setup Tailwind styles

Open src/index.css and replace contents with:
```CSS
5. Setup Tailwind styles

Open src/index.css and replace contents with:
```
---

### 6. Run the app
```Bash
6. Run the app
```

Then open:
```
http://localhost:5173
```

---

## 📁 Project Structure
```
src/
  App.jsx        → Main application logic + UI
  main.jsx       → App entry point
  index.css      → Tailwind import
```

---

## 🧩 Key Components
### Tooltip
Reusable hover explanation component used for UX clarity.

---

### Project Tracker Logic
- Auto name extraction from GitHub URL
- Progress clamping (0–100%)
- Timestamp updates on change

---

### Local Storage
All user data is stored using:
```JavaScript
localStorage
```
Key:
```
ai_engineer_training_app_v1
```

---

## 🧠 How to Use This App Effectively

### 1. Follow the daily cadence
Consistency > intensity

---

### 2. Treat projects as proof
Everything should connect to a real GitHub repo

---

### 3. Use Code / Example actively
- Run it
- Break it
- Fix it
- Explain it

---
  
### 4. Track progress honestly
The value is not perfection — it’s visibility

--- 

## 🚀 Future Enhancements
- GitHub API integration (auto-sync repos)
- Authentication (Firebase / Supabase)
- Progress streak tracking
- AI coaching assistant
- Deployment (Vercel)

---

## 🧭 Philosophy
This app is not about learning more.

It’s about:
- building faster
- thinking better
- proving skill

---

## 👤 Author
Built as a high-performance skill acceleration system for modern software engineers.

---

## 📄 License
MIT
