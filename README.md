# Agnos Health — Patient Form & Real-Time Staff Monitor

A modern medical patient registration form synchronized in real-time with a medical staff view. Built for the Agnos Front-End Developer Assignment.

---

## 🌟 Project Overview

This project consists of two synchronized views:
1. **Patient Form (`/patient`)**: Patient-facing form for pre-registering medical history, personal info, contact details, demographics, and emergency contacts. Includes Zod schema validation, progress tracking, auto-formatting, and inactivity detection.
2. **Staff View (`/staff`)**: Real-time dashboard for clinical staff to monitor active patient filling sessions, inspect fields as patients type character-by-character, view status indicators (`typing/filling`, `submitted`, `inactive`), generate mobile QR codes, and review historical submitted medical records.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router with TypeScript)
- **Styling**: Tailwind CSS v4, Lucide Icons, Framer Motion
- **Form & Validation**: `react-hook-form` + `zod`
- **Real-Time Engine**: Dual-Engine (`BroadcastChannel` for zero-latency local tab sync + `Pusher` for cross-device cloud sync)
- **QR Code**: `qrcode.react`

---

## 🛠️ Quick Start & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd Assignment1-front-end
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Testing Real-Time Synchronization
1. Open **Staff View** in Window A: [http://localhost:3000/staff](http://localhost:3000/staff)
2. Open **Patient Form** in Window B: [http://localhost:3000/patient](http://localhost:3000/patient)
3. Type into any field in Window B (Patient Form) — watch Window A (Staff View) update **character-by-character** with active field highlights and status `กำลังกรอก`!
4. Leave Window B idle for 30 seconds — watch the status automatically change to `inactive`.
5. Click **Submit Form** in Window B — watch Window A instantly receive the record into the **Submitted Medical Records Table** with status `ส่งข้อมูลแล้ว`!

---

## ✨ Features & Evaluation Highlights

- **Required Patient Fields**: First/Middle/Last Name, Date of Birth, Gender, Phone, Email, Address, Preferred Language, Nationality, Emergency Contact (Optional), Religion (Optional).
- **Validation**: Strict Zod rules for phone format (`08X-XXX-XXXX`), email format, DOB past date validation, and required field checks with inline Thai/EN messages.
- **Status Indicators**:
  - 🟡 `กำลังกรอก (typing/filling)`: Live typing indicator with active field name highlight.
  - ⚪ `inactive`: Auto-detected 30s inactivity timeout.
  - 🟢 `ส่งข้อมูลแล้ว (submitted)`: Verified submission with HN patient ID generation.
- **Mobile QR Code Generator**: Staff can click "Patient QR Code" to show a QR code for patients to scan on mobile.
- **Patient Detail & Print**: Staff can click "View Record" on any submitted patient to open a full medical record modal with print functionality (`window.print()`).
- **Responsive Layout**: Designed for Mobile (375px), Tablet, and Desktop screen sizes.

---

## 📄 Documentation

Detailed architecture, design decisions, folder structure, component breakdown, and real-time sequence diagrams can be found in [`docs/DEVELOPMENT_PLANNING.md`](./docs/DEVELOPMENT_PLANNING.md).

---

## 🌐 Live Deployment Guide (Vercel)

This repository is pre-configured for 1-click deployment on [Vercel](https://vercel.com):

1. Push code to GitHub.
2. Import project into Vercel.
3. Deploy! (Zero environment setup required for local BroadcastChannel sync; optionally add `NEXT_PUBLIC_PUSHER_KEY` for cloud sync).
