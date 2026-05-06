# SkillBridge Client

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-12.12.1-FFCA28?style=for-the-badge&logo=firebase)

**Live Link**: [SkillBridge Frontend](https://skill-bridge-frontend-leskkmj37-rubel6623s-projects.vercel.app)

SkillBridge is a modern, responsive web application designed for students and tutors. It features dynamic dashboards, comprehensive recruitment workflows, and a robust administrative interface tailored for an optimized learning and teaching experience.

## Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI, Radix UI, Lucide React
- **Authentication**: Firebase Authentication (Social Login)
- **Data Visualization**: Recharts
- **Forms & Validation**: React Hook Form, Zod

## Key Features
- **Student Dashboard**: A personalized, intuitive space for students to manage their learning journey.
- **Tutor Recruitment Workflow**: Secure, role-restricted application process for aspiring tutors.
- **Admin Dashboard**: Comprehensive management interface featuring real-time revenue and task status charts using Recharts.
- **Blog Management**: Full suite for administrators to publish and manage content.
- **Theme Support**: Seamless light/dark mode experience across all portals.
- **Messaging System**: Direct messaging capabilities and notifications.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Firebase and API configuration. Example:
   ```env
   NEXT_PUBLIC_API_URL=https://skill-bridge-server-rubel6623-rubel6623s-projects.vercel.app/api
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.
