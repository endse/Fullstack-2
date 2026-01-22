# CourseFlow - Student Portal

CourseFlow is a modern, responsive, and interactive student course management portal built with React and TypeScript. It features a comprehensive course catalog, a detailed dashboard for progress tracking, a dedicated learning interface (Course Player), and an AI-powered academic advisor integrated via the Google Gemini API.

## 🚀 Features

### 1. **Course Catalog & Discovery**
*   **Browse Courses:** View a list of available courses with rich details including thumbnails, ratings, and instructor info.
*   **Advanced Filtering:** Search courses by title, instructor, or description. Filter results by Category (Development, Design, Business, etc.) and Difficulty Level.
*   **Course Details Modal:** Click on any course to view an expanded description, curriculum preview, and a gallery of course images.

### 2. **Student Dashboard**
*   **Progress Tracking:** Visual progress bars for enrolled courses.
*   **Analytics:** Interactive charts (using Recharts) displaying completion status (Completed, In Progress, Not Started).
*   **Statistics:** specific metrics like Total Learning Hours, Certificates Earned, and Average Progress.
*   **Certificate Download:** Simulates the ability to download certificates for completed courses.
*   **Persistence:** Course progress is saved locally using `localStorage`, ensuring data persists between sessions.

### 3. **Interactive Course Player**
*   **Video Learning Interface:** A dedicated view for consuming course content.
*   **Curriculum Sidebar:**
    *   **Accordion Navigation:** Smoothly expand and collapse course modules.
    *   **Progress Tracking:** Mark individual lessons as complete with visual checkmarks.
    *   **Active State:** Visual indicators for the currently playing lesson.
*   **Content Tabs:** Switch between "Overview", "Q&A", and "Notes" for each lesson.

### 4. **AI Academic Advisor**
*   **Gemini Integration:** Powered by the Google Gemini API (`@google/genai`).
*   **Context-Aware:** The AI is grounded with the specific context of the available course catalog. It can recommend courses, explain details, and answer questions based on the mock data provided.
*   **Real-time Chat:** A floating chat widget available throughout the application (except in the Course Player).

### 5. **User Management (Simulation)**
*   **Authentication Flow:** Mock Login and Registration screens.
*   **Enrollment:** Authenticated users can enroll in courses, which immediately populate their dashboard.

## 🛠️ Tech Stack

*   **Frontend Framework:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **AI SDK:** Google GenAI SDK (`@google/genai`)
*   **Build/Runtime:** ES Modules (esm.sh) for browser-native development.

## 📂 Project Structure

```
├── index.html              # Application entry point
├── index.tsx               # React root mounting
├── App.tsx                 # Main application logic & routing (View switching)
├── types.ts                # TypeScript interfaces (Course, User, Lesson, etc.)
├── metadata.json           # App metadata and permissions
├── services/
│   └── geminiService.ts    # Google Gemini API configuration and chat session management
└── components/
    ├── AICourseAdvisor.tsx # Floating AI chat widget component
    ├── CourseCard.tsx      # Individual course display card
    ├── CoursePlayer.tsx    # Learning interface with sidebar and video player
    └── Dashboard.tsx       # User analytics and progress tracking
```

## 🔌 AI Integration

The application uses the `@google/genai` SDK to communicate with Google's Gemini models.

*   **Model:** `gemini-3-flash-preview` (Optimized for speed and efficiency).
*   **System Instructions:** The AI is initialized with a system prompt that includes a summarized text version of the `MOCK_COURSES` data. This allows the AI to act as a specialized domain expert for CourseFlow.
*   **Configuration:** The API key is expected to be available in `process.env.API_KEY`.

## 💾 Data Persistence

The application uses `localStorage` to simulate a backend database for user progress:
*   `courseflow_progress_{userId}`: Stores the overall percentage completion for courses.
*   `courseflow_progress_data_{userId}_{courseId}`: Stores the specific list of completed lesson IDs for granular tracking.

## 🎨 Visual Design

*   **Theme:** Clean, modern interface using a Slate/Indigo/Emerald color palette.
*   **Responsiveness:** Fully responsive design that works on mobile, tablet, and desktop.
*   **Animations:**
    *   Smooth transitions for hover effects.
    *   CSS Grid transitions for the sidebar accordion.
    *   Fade-in effects for modals and notifications.

## 🚀 Getting Started

1.  **Environment Setup:** Ensure you have a valid Google Gemini API Key.
2.  **Run the App:** Open `index.html` in a modern browser that supports ES Modules, or serve it using a local development server (e.g., `vite`, `live-server`, or `http-server`).
3.  **Explore:**
    *   Login (Mock credentials pre-filled).
    *   Browse the catalog.
    *   Ask the AI Advisor for a recommendation.
    *   Enroll in a course and track your progress in the Dashboard.
