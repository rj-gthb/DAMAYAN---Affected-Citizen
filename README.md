# Affected Citizen

**Affected Citizen** a comprehensive full-stack mobile application designed to streamline citizen assistance. Built with a tech stack (NestJS and Expo),

---

## 🏗️ Architecture

- **Backend**: [NestJS](https://nestjs.com/) (Node.js Framework)
- **Frontend**: [Expo](https://expo.dev/) (React Native)
- **Database / Auth**: [Supabase](https://supabase.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

### 2. Project Setup

#### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start:dev
   ```

#### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 📂 Project Structure

```text
Affected-Citizen/
├── backend/            # NestJS API application
│   ├── src/            # Source code (Auth, Storage, Supabase modules)
│   ├── .env            # Environment configuration
│   └── .env.example    # Template for environment variables
├── frontend/           # Expo (React Native) mobile app
│   ├── app/            # Expo Router screens (Auth, Main, Home)
│   ├── components/     # Shared UI components
│   └── lib/            # Supabase client and utilities
└── README.md           # This file
```

---

## 🛠️ Key Commands

### Backend
- `npm run start:dev` - Runs the API in watch mode.
- `npm run build` - Compiles the project.
- `npm run test` - Runs unit tests.

### Frontend
- `npx expo start` - Starts the Expo development server.
- `then choose 

---

## 🛠️ Testing

- Use sample1@gmail.com (email) Sample123 (password) to test the features.
- Individual and Family registration will reflect in the table "register_citizens", and family members in "families"

