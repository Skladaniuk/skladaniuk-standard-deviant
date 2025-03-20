import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";
import { UserFormPage } from "./pages/UserFormPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UserFormPage />} />
      <Route path="/users/edit/:id" element={<UserFormPage />} />
    </Routes>
  );
}

export default App;
