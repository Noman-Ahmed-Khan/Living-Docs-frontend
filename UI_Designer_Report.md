# Frontend Project Structure & UI Flow Report

This document provides a comprehensive overview of the frontend architecture, folder organization, and user navigation flow for the UI Design team.

---

## 📂 Folder Structure

The project follows a modular and feature-based architecture built on **Next.js 14 (App Router)**.

### 1. `app/` (Routing & Layouts)
The core of the application's routing.
- **`(auth)/`**: Handles authentication flows. Includes Login, Register, Forgot Password, Reset Password, and Email Verification.
- **`(dashboard)/`**: The main authenticated area.
  - `projects/`: List of user projects and individual project dashboards.
  - `settings/`: Global user preferences and account settings.
- **`globals.css`**: Global Tailwind CSS styles and variables.
- **`layout.tsx`**: The root layout wrapper (contains fonts and global providers).

### 2. `components/` (Shared UI Elements)
Atomic and reusable components separated by context.
- **`landing/`**: Components specifically for the landing page (Hero section, Features, CTA, Navbar).
- **`layout/`**: Structural components used across the dashboard (Sidebar, Header, User Navigation).
- **`ui/`**: Base UI primitives (Buttons, Inputs, Spinners, Empty States).
- **`providers/`**: React Context providers for Auth, Theme, and Data Fetching (Query Client).

### 3. `features/` (Domain-Specific Logic)
This is where the complex, feature-specific UI and business logic live. Each feature is self-contained.
- **`auth/`**: Login/Signup forms and auth-specific hooks.
- **`chat/`**: Chat interface components, message bubbles, and interaction logic.
- **`documents/`**: PDF viewers, document lists, and upload interfaces.
- **`projects/`**: Project creation cards, lists, and management UI.

### 4. `lib/` (Infrastructure)
Non-UI code that supports the application.
- **`api/`**: API client configurations and endpoint definitions.
- **`validators/`**: Zod schemas for form validation.
- **`utils.ts`**: Helper functions (e.g., Tailwind class merging).

### 5. `hooks/` & `store/` (State & Logic)
- **`hooks/`**: Reusable custom hooks (e.g., `use-debounce`, `use-media-query`).
- **`store/`**: Global state management (Zustand) for Auth and persistent UI states.

---

## 🔄 Website Flow

### A. Discovery Phase (Public)
1. **Landing Page (`/`)**: High-level overview of the product features.
2. **Auth Gateway**: Users are directed to **Login** or **Register**.

### B. Authentication Flow
- **Registration**: User signs up -> Verify Email -> Redirect to Projects.
- **Login**: Authenticated users are automatically redirected to the `/projects` dashboard via middleware.

### C. Workspace Flow (Authenticated)
1. **Projects Dashboard (`/projects`)**: The primary landing spot. Shows a grid/list of existing projects.
2. **Project Entry**: Clicking a project leads to the **Project Specific View** (`/projects/[projectId]`).
3. **Internal Navigation**: Once inside a project, users can toggle between:
   - **Chat**: Interactive AI workspace.
   - **Documents**: Repository for project-related files.
   - **Settings**: Specific configurations for that project.

### D. Global Management
- **User Profile**: Accessible from the top header `UserNav`.
- **Global Settings**: Manage account-wide preferences like notifications or theme.

---

## 🎨 UI Guidelines for Designers
- **Consistency**: Use the `components/ui` primitives for all basic interactions.
- **Responsive Design**: Hooks like `use-media-query` are used to adapt layouts (especially the Sidebar) for mobile.
- **Feedback**: Loading states and empty states are centralized in `components/ui` to ensure a uniform user experience during data fetching.
