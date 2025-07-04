# Micro-Quiz Platform

A modern, responsive web application built with Next.js that allows users to take short, topic-specific quizzes. This project demonstrates dynamic routing, various data fetching strategies, API routes, image optimization, accessibility, and more.

---

## 🚀 Features
- **Home Page**: Lists quiz categories (History, Science, Math, Programming) with optimized icons and SSG.
- **Category Listing**: Dynamic route for each category, SSR, displays all quizzes in the category.
- **Quiz Page**: Dynamic route for each quiz, SSR, presents questions one at a time, instant feedback, score at the end.
- **API Routes**: All data (categories, quizzes, quiz details) served via Next.js API routes with mock JSON data.
- **Image Optimization**: Uses `next/image` for logo and category icons.
- **Styling**: Tailwind CSS for modern, responsive design.
- **Accessibility**: ARIA labels, focus-visible, keyboard navigation, and color contrast.
- **Animations**: Subtle fade-in for feedback, smooth transitions on cards and buttons.

---

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, custom SVGs
- **Language**: TypeScript

---

## 📁 Folder Structure
```
app/
  api/                # Next.js API routes (categories, quizzes, quiz details)
  quizzes/[category]/  # Category listing page (SSR)
  quiz/[id]/           # Individual quiz page (SSR)
  page.tsx             # Home page (SSG)
  globals.css          # Global styles (Tailwind, animations)
components/
  QuizInterface.tsx    # Main quiz UI logic
  ui/                  # Reusable UI components
public/
  quiz.png             # Logo
  history.svg          # History icon
  science.svg          # Science icon
  math.svg             # Math icon
  programming.svg      # Programming icon
```

---

## ⚡ Data Fetching Strategies
- **Home Page**: SSG (static) using server component and `fetch(..., { cache: 'force-cache' })`.
- **Category Listing**: SSR (server-side) using server component and `fetch(..., { cache: 'no-store' })`.
- **Quiz Page**: SSR (server-side) using server component and `fetch(..., { cache: 'no-store' })`.
- **Client State**: `useState` for quiz progress and feedback.

---

## 🔗 API Routes
- `/api/categories` — Returns all quiz categories.
- `/api/quizzes/[category]` — Returns all quizzes for a given category.
- `/api/quiz/[id]` — Returns quiz details (questions, options, correct answers).

All data is mock JSON, no database required.

---

## 🖼️ Image Optimization
- All images (logo, category icons) are served from `/public` and rendered with `next/image` for automatic optimization.

---

## ♿ Accessibility
- All interactive elements have ARIA labels and focus-visible styles.
- Sufficient color contrast and keyboard navigation support.

---

## ✨ Animations & Polish
- Fade-in animation for quiz feedback (see `.animate-fade-in` in `globals.css`).
- Smooth transitions and scaling on cards and buttons.

---

## 🧑‍💻 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🏗️ Build for Production
```bash
npm run build
npm start
```

---

## 📚 Credits
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Open source SVGs]

---

## 📄 License
MIT 