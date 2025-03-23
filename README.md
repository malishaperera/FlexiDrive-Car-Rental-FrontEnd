# 🚗 FlexiDrive Car Rental - Frontend

![FlexiDrive Logo](https://example.com/logo.png)  
*(Replace with your actual logo URL if available)*  

FlexiDrive is a **modern, user-friendly car rental platform** designed for seamless online vehicle booking. This repository contains the frontend, built with **React, TypeScript, Redux, React Router, Axios, and Tailwind CSS**.

---

## **📌 Features**

✅ Car search & filtering  
✅ Secure authentication (Token-based login)  
✅ Real-time booking system  
✅ Interactive car catalog with high-quality images  
✅ Admin panel for managing cars & bookings  
✅ Smooth and responsive UI  

---

## **🛠 Tech Stack**

| Technology      | Purpose |
|----------------|---------|
| **React**      | Frontend UI development |
| **TypeScript** | Strongly-typed JavaScript |
| **Redux**      | State management |
| **React Router** | Navigation and routing |
| **Axios**      | API calls |
| **Tailwind CSS** | Responsive styling |
| **Prisma**     | Database ORM (for backend) |
| **MySQL**      | Database (for backend) |

---

## **🚀 Installation & Setup**

### 1️⃣ Clone the repository:
```sh
git clone https://github.com/malishaperera/FlexiDrive-Car-Rental-FrontEnd.git
cd FlexiDrive-Car-Rental-FrontEnd
npm install

 2️⃣ API Configuration:
VITE_API_BASE_URL=http://localhost:5000/api

3️⃣ Folder Structure:
📂 src/
 ├── 📂 components/         # Reusable UI components
 ├── 📂 pages/              # Application pages
 ├── 📂 redux/              # Redux store & slices
 ├── 📂 hooks/              # Custom hooks
 ├── 📂 utils/              # Utility functions
 ├── 📂 assets/             # Images & static files
 ├── App.tsx               # Main app component
 ├── main.tsx              # Entry point
 ├── routes.tsx            # Routing setup

 📜 License
This project is licensed under the MIT License. Feel free to use and modify it.

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
