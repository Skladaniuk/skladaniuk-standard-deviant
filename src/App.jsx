import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { UsersPage } from "./pages/UsersPage";
import { UserFormPage } from "./pages/UserFormPage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
function App() {
  const { fetchUsers, users } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/edit/:id" element={<UserFormPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
