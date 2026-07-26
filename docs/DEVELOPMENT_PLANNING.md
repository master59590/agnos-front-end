# Agnos Front-End Developer Assignment — Development Planning Document

This document details the architectural decisions, design patterns, UI/UX rationale, component structure, and real-time synchronization sequence for the Agnos Patient Form & Staff Monitor application.

---

## 1. Project Structure

The project follows a **Feature-Driven & Layered Architecture** to maximize modularity, maintainability, and ease of future customization:

```text
C:\Users\Akkharaphon\Documents\Agnos\Assignment1-front-end\
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Global App Layout & SEO Metadata
│   │   ├── page.tsx                    # Portal Landing Page
│   │   ├── patient/
│   │   │   └── page.tsx                # Patient Form View Page
│   │   ├── staff/
│   │   │   └── page.tsx                # Staff Dashboard Monitor Page
│   │   └── api/
│   │       └── realtime/               # API route for Pusher WebSocket triggers
│   ├── config/
│   │   ├── constants.ts                # Gender, Language, Nationality, Religion options
│   │   └── patientFields.ts            # Field metadata configurations
│   ├── types/
│   │   ├── patient.ts                  # Patient Data model interfaces
│   │   └── realtime.ts                 # Realtime payload & status types ('typing/filling' | 'submitted' | 'inactive')
│   ├── schemas/
│   │   └── patientSchema.ts            # Zod validation schema (phone regex, email, required fields)
│   ├── hooks/
│   │   ├── usePatientForm.ts           # Form management logic
│   │   ├── useRealtimeSync.ts          # Realtime sync subscriber/publisher hook
│   │   └── useInactivityTimer.ts       # 30-second user inactivity detector
│   ├── lib/
│   │   ├── realtime/
│   │   │   ├── broadcastAdapter.ts     # HTML5 BroadcastChannel adapter (Zero-config local tab sync)
│   │   │   ├── pusherAdapter.ts        # Pusher client adapter (Cloud multi-device sync)
│   │   │   └── realtimeManager.ts      # Strategy pattern manager unifying adapters
│   │   └── utils.ts                    # Helper utilities (cn, date/phone formatters, ID generators)
│   └── components/
│       ├── ui/                         # Atomic UI Primitives (Design System)
│       │   ├── Button.tsx
│       │   ├── Input.tsx
│       │   ├── Select.tsx
│       │   ├── Card.tsx
│       │   ├── Badge.tsx
│       │   └── Modal.tsx
│       ├── patient/                    # Modular Patient Form Components
│       │   ├── PatientFormHeader.tsx
│       │   ├── FormProgressBar.tsx
│       │   ├── PersonalInfoSection.tsx # First/Middle/Last Name, DOB, Gender
│       │   ├── ContactInfoSection.tsx  # Phone, Email, Address
│       │   ├── DemographicSection.tsx  # Preferred Language, Nationality
│       │   ├── AdditionalInfoSection.tsx# Emergency Contact, Religion
│       │   └── SuccessModal.tsx
│       └── staff/                      # Modular Staff Monitoring Components
│           ├── StaffHeader.tsx
│           ├── LiveSessionMonitor.tsx  # Live session cards with status indicator
│           ├── LiveFieldPreviewCard.tsx# Character-by-character & active field inspector
│           ├── PatientTable.tsx        # Submitted patient records table
│           ├── PatientDetailModal.tsx  # Full submitted medical record modal
│           └── QRCodeModal.tsx         # Mobile QR Code modal generator
├── docs/
│   └── DEVELOPMENT_PLANNING.md
├── README.md
├── package.json
└── tailwind.config.ts
```

---

## 2. Design Decisions & UI/UX Strategy

### Target Audience & Tone:
- **Medical / Healthcare Focus**: Crisp, clean, trustworthy aesthetic inspired by modern clinical software (Teal `#0d9488`, Emerald `#10b981`, and Slate `#0f172a` tones).
- **Dual Perspective**:
  - **Patient View**: Accessible, single-column responsive flow with clear field labels, progress bar, inline validation feedback, and auto-formatting (e.g. phone numbers formatted as `08X-XXX-XXXX`).
  - **Staff View**: Data-dense dashboard with live status indicators, session cards, character-by-character live field inspector, and search/filter tools for submitted medical records.

### Responsiveness Across Screen Sizes:
1. **Mobile (< 640px)**:
   - Form inputs stack vertically in 1 column for ease of thumb tapping.
   - Modals take up full screen width with max padding.
   - Staff view session cards stack cleanly in a single scrollable feed.
2. **Tablet (640px - 1024px)**:
   - Form sections use 2-column grid layouts for First/Last Name, Phone/Email, Language/Nationality.
   - Live session cards fit in a 2-column grid.
3. **Desktop (1024px+)**:
   - 3 to 4 column grids for form fields and live field inspectors.
   - Side-by-side or stacked monitoring panels on Staff View for high data density.

---

## 3. Component Architecture

### Single-Responsibility Principle:
Instead of putting 1,000 lines of code into `patient/page.tsx`, the form is decomposed into isolated section components (`PersonalInfoSection`, `ContactInfoSection`, `DemographicSection`, `AdditionalInfoSection`). Each section receives `register`, `errors`, and `onFocusField` from the parent controller hook.

### Strategy Pattern for Real-Time Sync:
`RealtimeManager` encapsulates multiple adapters:
- **`BroadcastAdapter`**: Leverages the browser's native `BroadcastChannel` API. Enables **instant 0-latency real-time sync** between tab A (Staff View) and tab B (Patient Form) on the same machine without requiring third-party credentials.
- **`PusherAdapter`**: Leverages Pusher WebSockets. Connects multi-device environments (e.g., patient filling form on mobile phone while staff monitors on desktop).

---

## 4. Real-Time Synchronization Flow

```text
[ Patient Form View ]                                [ Staff View Dashboard ]
         │                                                      │
         ├──── 1. User types in "Phone" field ─────────────────>│
         │     Payload: { status: "typing/filling",             │
         │                activeField: "phone",                 │
         │                formData: { phone: "081-23..." } }    │
         │                                                      ├── Updates Status Badge: "กำลังกรอก"
         │                                                      └── Highlights "Phone" field in amber
         │                                                      │
         ├──── 2. User pauses typing for > 30s ────────────────>│
         │     Payload: { status: "inactive", activeField: null }
         │                                                      └── Updates Status Badge: "Inactive"
         │                                                      │
         ├──── 3. User clicks "Submit Form" ───────────────────>│
         │     Payload: { status: "submitted",                  │
         │                formData: { fullRecord... } }         ├── Updates Status Badge: "ส่งข้อมูลแล้ว"
                                                                └── Inserts new record into Patient Table
```

---

## 5. Status Indicators Definition

| Status Indicator | Label (TH/EN) | Visual Badge Style | Condition / Trigger |
| :--- | :--- | :--- | :--- |
| `typing/filling` | **กำลังกรอก (Filling)** | Amber badge + Pulsing dot | Patient is currently focusing an input or typing in the form. |
| `inactive` | **Inactive (ไม่มีเคลื่อนไหว)** | Slate badge + Static gray dot | Patient has not moved cursor or typed for 30 consecutive seconds. |
| `submitted` | **ส่งข้อมูลแล้ว (Submitted)** | Emerald badge + Solid green dot | Patient has successfully validated and submitted the form. |
