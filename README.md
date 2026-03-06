# 🖥️ Employee Management System — Frontend

A modern, role-based Employee Management System frontend built for **4bitLabs**. This single-page application provides dedicated dashboards for **Admin**, **Analyst**, **Trainer**, and **Counsellor** roles, enabling efficient management of employees, batches, students, assignments, and batch progress.

## Tech Stack

- **React 19** with Vite for fast development and HMR
- **Tailwind CSS 4** for responsive, utility-first styling
- **React Router v7** for client-side routing
- **Axios** for API communication
- **React Icons** for consistent iconography
- **React Hot Toast** for notification toasts
- **JSON Server** as a mock REST API backend during development

## Features

- **Role-Based Authentication** — Secure login that routes users to their respective dashboards (Admin, Analyst, Trainer, Counsellor)
- **Admin Dashboard** — Full CRUD for trainers, analysts, and counsellors with search/filter capabilities
- **Analyst Dashboard** — Batch management (create, edit, delete, view) with trainer assignment and dynamic student count tracking
- **Trainer Dashboard** — View assigned batches, add/edit/delete batch progress entries with document uploads
- **Counsellor Dashboard** — Student management with batch assignment, batch transfer, and batch-wise student views
- **Professional Data Model** — ID-based entity relationships, camelCase field naming, and dynamically calculated derived fields (no redundant data storage)

## Project Structure

```
src/
├── components/       # Reusable UI components (modals, views, layout)
├── constants/        # App-wide constants and role config
├── data/             # db.json (JSON Server mock database)
├── hooks/            # Custom hooks (useEmployees, useBatches)
├── pages/            # Role-specific dashboard pages + Login/Landing
├── services/         # API service layer (Axios)
└── utils/            # Utility functions (notifications, storage)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start JSON Server (mock backend on port 3000)
npx json-server --watch src/data/db.json 

# Start development server (port 5173)
npm run dev
```

## Data Model

| Entity         | Key Fields                                                       |
|---------------|------------------------------------------------------------------|
| **Admin**      | email, fullName, password, role, username                        |
| **Trainer**    | name, email, phone, specialization, experienceYears, qualification, joiningDate, salary |
| **Analyst**    | name, email, phone, department, joiningDate, salary              |
| **Counsellor** | name, email, phone, department, joiningDate, salary              |
| **Student**    | name, email, phone, status, joiningDate, counsellorId            |
| **Batch**      | name, course, trainerId, analystId, startDate, endDate, status   |
| **Assignment** | studentId, batchId, assignedDate, status                         |
| **BatchProgress** | batchId, trainerId, title, description, sessionNumber, topicCovered, createdAt |

> All relationships use **ID-based references** (e.g., `trainerId`, `analystId`, `counsellorId`). Student counts per batch are **calculated dynamically** from the assignments collection.
