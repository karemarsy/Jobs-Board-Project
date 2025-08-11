## Job Board Application
A modern, responsive job board application built with React, Next.js, Redux Toolkit, and Tailwind CSS. This application allows users to browse job listings, filter jobs, view detailed job information, and apply for positions with full authentication support.

# ✨ Features
Core Functionality

Job Browsing: View paginated job listings with search and filter capabilities
Job Details: Comprehensive job information with company details and requirements
Job Applications: Complete application flow with form validation
User Authentication: Login/Register system with persistent sessions
Responsive Design: Mobile-first design that works on all devices
Loading States: Smooth loading indicators and skeleton screens
Error Handling: Comprehensive error states and user feedback

# 🛠️ Technology Stack

Frontend: React 18, Next.js 14,
State Management: Redux Toolkit,
Styling: Tailwind CSS,
Forms: React Hook Form with Zod validation,
Icons: Lucide React,
Testing: Jest, React Testing Library,
Mock API: JSON Server,
TypeScript: Full type safety,

## Getting Started

Prerequisites

Node.js 18 or later,
npm or yarn package manager

## Installation

1. Clone the repository
 ```
git clone https://github.com/karemarsy/Jobs-Board-Project
cd Jobs-Board-Project
```

2. Install dependencies
```
npm install

```

3. Set up the mock database
The db.json file is already included with sample data. No additional setup required.

4. Run the development server

```
npm run dev
```
5. View the application
Open http://localhost:3000 in your browser.

The mock API server will automatically start on http://localhost:3001.

6. Demo Credentials
Use these credentials to test the application:

Email: demo@example.com
Password: password123



## Test Coverage
The application includes unit tests for:

Authentication components (LoginForm, RegisterForm),
Job components (JobCard, ApplicationForm),
Redux slices (authSlice, jobSlice),
Utility functions,
Critical user flows,

## 📝 API Endpoints
The mock API provides these endpoints:

GET /jobs - Get job listings with pagination and filters,
GET /jobs/:id - Get job details by ID,
POST /applications - Submit job application,
GET /applications - Get user applications,
POST /users - Register new user,
GET /users - Get users (for authentication)

## 🚀 Live Demo

