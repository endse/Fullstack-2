# Next.js Counter Application

## Overview
This repository contains a simple **Counter Application** built using **Next.js (App Router)** and **React Hooks**.  
The project is designed to demonstrate core concepts of client-side interactivity in Next.js, including state management, event handling, and component rendering.

This application is suitable for academic labs, beginner practice, and introductory demonstrations of modern React within the Next.js framework.

---

## Objectives
- Understand the Next.js App Router structure
- Learn the difference between Server Components and Client Components
- Implement client-side state using the `useState` hook
- Handle user-driven events such as button clicks
- Observe automatic UI re-rendering based on state changes

---

## Technologies Used
- Next.js 13+ (App Router)
- React.js
- JavaScript / TypeScript
- JSX / TSX
- CSS (optional styling)

---

## Project Structure
```
next-counter-app/
│
├── app/
│   ├── page.tsx        # Counter page (Client Component)
│   ├── layout.tsx      # Root layout component
│
├── public/
│
├── package.json
├── next.config.js
└── README.md
```

---

## Application Explanation

### App Router Usage
This project uses the **Next.js App Router**, where routing is based on the file system.  
The `app/page.tsx` file represents the root route of the application.

By default, components in the App Router are Server Components. Since this application requires browser-based interactivity, the page is explicitly declared as a **Client Component**.

```ts
"use client";
```

---

### State Management
The counter value is managed using the React `useState` hook.

```ts
const [count, setCount] = useState(0);
```

- `count` stores the current counter value
- `setCount` updates the state
- Initial state is set to zero

Any change in state automatically triggers a re-render of the component.

---

### Event Handling
User interactions are handled through button click events:

- Increment increases the counter value by one
- Decrement decreases the counter value by one
- Reset sets the counter value back to zero

Each button is connected to its respective handler using the `onClick` attribute.

```tsx
<button onClick={() => setCount(count + 1)}>Increment</button>
```

---

### Rendering Logic
The current counter value is displayed dynamically using JSX.

```tsx
<h1>{count}</h1>
```

The displayed value updates immediately when the state changes, without requiring a page reload.

---

## Installation and Execution

### Step 1: Clone the Repository
```
git clone https://github.com/your-username/next-counter-app.git
```

### Step 2: Navigate to the Project Directory
```
cd next-counter-app
```

### Step 3: Install Dependencies
```
npm install
```

### Step 4: Run the Development Server
```
npm run dev
```

The application will be available at:
```
http://localhost:3000
```

---

## Use Cases
- Academic lab experiment for React and Next.js
- Demonstration of React Hooks
- Introductory project for App Router concepts
- Technical interview or viva explanation

---

## Future Enhancements
- Add upper and lower bounds to the counter
- Disable decrement when the counter reaches zero
- Add animations or transitions
- Convert logic into reusable components
- Add unit testing with Jest or Vitest

---

## Learning Outcomes
After completing this project, a learner should be able to:
- Explain client-side rendering in Next.js
- Use React hooks effectively
- Manage state-driven UI updates
- Differentiate between Server and Client Components

---

## License
This project is licensed under the MIT License.

---

## Author
Chirag

