import "./App.css";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Jobdetails from "./pages/jobdetails";
import Error from "./pages/notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

       
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="details/:id"
          element={
            <ProtectedRoute>
              <Jobdetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
