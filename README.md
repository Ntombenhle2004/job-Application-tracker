<img src="https://socialify.git.ci/Ntombenhle2004/job-Application-tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="job-Application-tracker" width="640" height="320" />

# Job Tracker – React Job Management App


**Job Tracker** is a React + Vite application designed to help users track job applications, manage application details, and view job-specific information. It features user authentication, protected routes, and a clean multi-page interface. The project uses **React 19**, **TypeScript**, **Vite**, and **React Router 7**.

---

## Project Structure

```
src/
│── App.tsx
│── App.css
│
├── pages/
│   ├── landing.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── home.tsx
│   ├── jobdetails.tsx
│   └── notfound.tsx
│
├── components/
│   └── ProtectedRoute.tsx
│
├── main.tsx
```

---

## Features

- **Landing Page** – A welcoming interface for first-time users.  
- **User Authentication** – Login and registration system with password hashing (`bcryptjs`).  
- **Protected Routes** – Restricts access to pages like Home and Job Details until logged in.  
- **Home Page** – View all job applications with details.  
- **Job Details Page** – View specific job details using dynamic routing (`/details/:id`).  
- **Error Page** – Displays a 404 page for invalid routes.  
- **API Integration** – Uses `axios` for HTTP requests (can connect to a backend or JSON server).  
- **React Router 7** – Handles routing between pages efficiently.  
- **JSON Server** – Optionally simulates a backend for testing.  

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ntombenhle2004/job-Application-tracker.git
   cd job-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Run Json server**
  ```bash 
  npx json-server db.json
  ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at: [http://localhost:5173](http://localhost:5173)

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Dependencies

```json
"dependencies": {
  "axios": "^1.12.2",
  "bcryptjs": "^3.0.2",
  "json-server": "^1.0.0-beta.3",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-icons": "^5.5.0",
  "react-router": "^7.9.1",
  "react-router-dom": "^7.9.1"
},
"devDependencies": {
  "@eslint/js": "^9.33.0",
  "@types/react": "^19.1.10",
  "@types/react-dom": "^19.1.7",
  "@vitejs/plugin-react": "^5.0.0",
  "eslint": "^9.33.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.3.0",
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.39.1",
  "vite": "^7.1.2"
}
```

---

## Usage

1. **Landing Page** – Navigate to `/` to see the landing page.  
2. **Register** – Create a new account via `/register`.  
3. **Login** – Sign in using `/login`.  
4. **Home Page** – Access `/home` after login to view jobs.  
5. **Job Details** – Navigate to `/details/:id` for individual job information.  
6. **Protected Routes** – Pages like Home and Job Details require login.  

---

## License

This project is for **educational purposes**. You may use, modify, and distribute it freely.  

---
