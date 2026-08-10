<div align="center">

# ⚡ M. Rashid Shafique
### Systems Engineer & Full-Stack Developer Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](#)
[![Material Design](https://img.shields.io/badge/Material%20Design%203-757575?style=for-the-badge&logo=Material-Design&logoColor=white)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](#)

An ultra-premium, production-grade professional developer portfolio built in strict compliance with **Google Material 3 (M3) specifications**, featuring theme-aware accessibility, fluid micro-interactions, and robust dynamic API integrations.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📑 Table of Contents

- [🚀 Architecture & Features](#-architecture--features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🛡️ Admin Moderation Access](#️-admin-moderation-access)
- [📈 Performance Optimization](#-performance-optimization)

---

## 🚀 Architecture & Features

### 📦 Dynamic Repository Sync
Fully integrated with the **GitHub REST API (v3)**. The application dynamically fetches public repositories, processes their metadata, and intelligently categorizes them (`AI / ML`, `Full-Stack`, `Backend`, `Open Source`) using tag and keyword heuristics. It features zero-layout-shift (CLS) statics fallback mechanisms to handle rate-limits elegantly.

### 📨 Functional Inbox Pipeline
Implements an AJAX-powered background contact form utilizing **FormSubmit**. User inquiries are validated client-side and dispatched asynchronously to a verified professional email address, eliminating the need for complex backend email servers or disruptive page redirects.

### ✍️ Stateful Client-Side Reviews
A live recommendation engine built into the UI. Visitors can rate and submit reviews that are instantly appended to the application state and persisted via the `localStorage` API.
* **Admin Moderation Mode**: A hidden administrative route (accessed via `?admin=true` URL parameter) enables localized moderation controls to delete inappropriate local submissions.

### 📱 Responsive Material 3 Layout
Built entirely with **Vanilla CSS Modules**, utilizing viewport snapping grids (`scroll-snap-type: x mandatory`) and negative bleeds to replicate the fluid, tactile "peek-card" carousel behavior found in native Google Play and Cloud applications.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Core Framework** | React JS (v18+), Vite, ES6+ Javascript |
| **Styling & UI** | Vanilla CSS Modules, CSS Variables (Theme-Aware) |
| **Animation** | Framer Motion, CSS `@keyframes` |
| **Icons** | Lucide React |
| **API & Data** | Fetch API, `localStorage`, GitHub REST API, FormSubmit |

---

## 📂 Project Structure

A modular, feature-based architecture ensures code scalability and maintainability:

```text
src/
├── assets/         # Static assets and media
├── components/     # Reusable UI primitives (Buttons, Headings)
├── constants/      # Static configuration and fallback data
├── features/       # Isolated feature modules (Domain-driven)
│   ├── about/
│   ├── contact/
│   ├── hero/
│   ├── projects/
│   ├── skills/
│   └── testimonials/
├── App.jsx         # Root layout and component assembly
└── main.jsx        # Application entry point
```

---

## ⚙️ Setup & Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rashidshafique-dev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛡️ Admin Moderation Access

To manage user-submitted recommendations locally:

1. Append `?admin=true` to your local or deployed portfolio URL (e.g., `http://localhost:5173/?admin=true`).
2. An **Admin Moderation Mode Active** banner will appear in the Testimonials section.
3. Custom reviews will now display a red trash icon (`Trash2`). Click to permanently remove the entry from state and `localStorage`.

---

## 📈 Performance Optimization

- **CSS Modules**: Guarantees zero global namespace collision and optimal dead-code elimination.
- **Native Scroll Snapping**: Uses CSS-native scroll snapping for carousels rather than heavy JS libraries, ensuring 60fps scrolling performance on mobile devices.

<div align="center">
  <br />
  <p>Engineered with precision and Google Material 3 aesthetics.</p>
</div>
