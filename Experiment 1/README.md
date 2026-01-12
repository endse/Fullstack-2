# Experiment 1 - React/Next.js 

## Overview
This project demonstrates **core React and Next.js concepts** including **component creation, state management, animations, theme toggling, and basic CRUD operations**.  
It is designed as a learning and experimentation environment for understanding the fundamentals of modern frontend development.

By completing this experiment, you will gain hands-on experience with:

- React functional components and hooks (`useState`, `useEffect`)  
- Next.js page and component structure  
- Adding animations and transitions with **Framer Motion**  
- Implementing a light/dark theme toggle  
- Building interactive applications like a **to-do list**

---

## Folder Structure and Details

### 1. `Counter`
Contains a simple **counter component** demonstrating:

- State management using `useState`  
- Increment and decrement functionality  
- Handling user events in React

**Learning Outcome:** Understand React state and basic interactivity in components.

---

### 2. `animations`
Demonstrates **animations and transitions** using **Framer Motion**:

- Animated headings, buttons, and blocks  
- Smooth page and component transitions  
- Hover and tap effects for interactive elements 
- Learn more about[Animations](Experiment 1/animations)

**Learning Outcome:** Learn how to implement fluid animations and enhance UI/UX in React/Next.js.

---

### 3. `theme_toggle`
Implements a **theme toggle feature**:

- Switch between light and dark modes dynamically  
- Uses React state or context for managing the theme  
- Conditional styling based on the selected theme

**Learning Outcome:** Learn about theming, dynamic styling, and optionally React Context API.

---

### 4. `to_do_list`
A **basic to-do list application** demonstrating:

- Adding, removing, and marking tasks as completed  
- Managing component state with arrays  
- Optional local storage for data persistence

**Learning Outcome:** Practice CRUD operations and state management in React.

---

### 5. `basic_form`
A **basic form application** demonstrating:

- Creating controlled form inputs using `useState`  
- Handling form submission events  
- Validating user input before submission  
- Managing multiple form fields within a single component  

**Learning Outcome:** Understand form handling, controlled components, and user input validation in React.

---

### 6. `node_modules`
Contains all installed dependencies for the project. **Do not modify manually.**

---

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

```bash
git clone <https://github.com/endse/Fullstack-2.git>
cd <Fullstack-2>

```
2. **Install dependencies**
```
npm install
# or
yarn install
```
3. **Run the Next app**
```
npm run dev
# or
yarn dev
```

4. **Open the application in your browser:**

Go to http://localhost:3000
 to view the project running locally.

## Usage

- Navigate to each module folder (`Counter`, `animations`, `theme_toggle`, `to_do_list`) to explore individual features.
- Run the project and interact with components to observe state changes and animations.
- Modify component props, styles, or state to experiment with different behaviors.
- Check the browser console for logs to better understand state updates and component lifecycle.

---

## Learning Objectives

By completing this experiment, you will:

1. Gain a practical understanding of React state and hooks (`useState`, `useEffect`)  
2. Implement animations and transitions using **Framer Motion**  
3. Build reusable UI components with dynamic theming (light/dark mode)  
4. Develop basic interactive applications like a **to-do list** and understand CRUD operations  
5. Learn best practices for folder structure and modular development in Next.js
