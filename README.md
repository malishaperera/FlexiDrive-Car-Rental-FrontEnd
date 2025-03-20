# FlexiDrive Car Rental - Frontend

## Overview
The **FlexiDrive Car Rental** project provides a user-friendly web interface for a car rental service. It allows users to search for available cars, view car details, and make bookings. The platform supports a seamless experience with real-time updates, easy navigation, and responsive design.

## Features

- **Search Box**: Users can search for cars based on their pickup and return location, date, and time.
- **Car Details Page**: Displays detailed information about the selected car, including images, price, and specifications.
- **Booking Form**: Allows users to make a booking by filling out their details and selecting car options.
- **User Authentication**: Secure login and registration for customers, allowing them to view and manage their booking history.
- **Real-time Updates**: Automatically reflects new car availability and updates to bookings.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management for handling customer data, car listings, and bookings.
- **TypeScript**: JavaScript superset providing static types.
- **Axios**: For API requests and handling responses from the backend.
- **Bootstrap**: Frontend framework for building responsive layouts and components.
- **Tailwind CSS**: Utility-first CSS framework for fast design customization.
- **Vite**: Modern build tool for fast and efficient development.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or above)
- [npm](https://www.npmjs.com/) (Node package manager)

### Steps to Get Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/malishaperera/FlexiDrive-Car-Rental-FrontEnd.git
   cd flexidrive-car-rental-frontend
   npm install
   npm run dev
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
