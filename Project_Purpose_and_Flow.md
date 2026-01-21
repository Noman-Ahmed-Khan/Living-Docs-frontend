# LivingDocs: Project Purpose and Flow

## 🎯 Project Purpose
**LivingDocs** is an AI-powered document interaction platform designed to transform static documents into dynamic, conversational assets. The primary goal is to provide users with a centralized workspace where they can manage, view, and "talk to" their documents using artificial intelligence.

### Core Value Propositions:
- **Context-Aware AI Chat**: Engage in deep conversations with your documents to extract insights, summaries, and specific data points.
- **Project-Based Organization**: Group related documents into logical projects for better workspace management.
- **Integrated PDF Experience**: View documents directly alongside the AI chat interface for seamless cross-referencing.
- **Secure Access**: A complete authentication system ensures that private documents and project data are protected.

---

## 🔄 Project Flow (User Journey)

### 1. Onboarding & Authentication
- **Entry**: Users arrive at the Landing Page, which highlights the product's capabilities.
- **Auth**: New users register; returning users log in. Middleware ensures that only authenticated users can access the dashboard.
- **Verification**: Email verification steps ensure account security.

### 2. The Workspace (Dashboard)
- **Projects Overview**: After logging in, users are greeted by the Projects Dashboard.
- **Management**: Users can create new projects, view existing ones, or delete outdated workspaces.
- **Navigation**: The sidebar and header provide quick access to global settings and account management.

### 3. Project Interaction (The "Living" Doc)
Once a project is selected, the flow moves into the specialized project workspace:
- **Document Upload**: Users add PDFs or other documents to the project's repository.
- **AI Conversation**: The user interacts with the AI Chat. The AI uses the uploaded documents as context to answer queries.
- **Document Viewing**: A dedicated PDF viewer allows users to read the source material while chatting with the AI.
- **Project Settings**: Users can rename projects or adjust project-specific configurations.

### 4. Global Settings & Management
- **User Preferences**: Users can update their profile, change themes, and manage notifications via the global settings page.

---

## 🛠 Technical Stack Highlights
- **Framework**: Next.js 14 (App Router) for high-performance server-side rendering and routing.
- **State Management**: Zustand for efficient global state handling (Auth, Projects).
- **Styling**: Tailwind CSS for a modern, responsive, and consistent UI.
- **Validation**: Zod for robust data and form validation.
