import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// 1. The Bouncer for Protected Pages (Dashboard)
// If there is no user, kick them back to the login screen
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// 2. The Bouncer for Public Pages (Login / Register)
// If they are ALREADY logged in, send them straight to the dashboard
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root URL (/) to the dashboard automatically */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Routes - Only accessible if NOT logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Only accessible IF logged in */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route for 404s (optional but good practice) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;