import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";

import Layout from "./pages/Layout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProjectView from "./pages/ProjectView";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/" element={<Layout />}>
          <Route  path="dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path="projects" element={<ProtectedRoutes><ProjectList /></ProtectedRoutes>} />
          <Route path="projects/:id" element={<ProtectedRoutes><ProjectView /></ProtectedRoutes>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
