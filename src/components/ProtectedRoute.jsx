import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      let user = null;
      
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }

      if (token && user) {
        setIsAuthenticated(true);
        setUserRole(typeof user.role === 'string' ? user.role.toLowerCase() : '');
      } else {
        setIsAuthenticated(false);
      }
      
      setIsAuthReady(true);
    };

    initializeAuth();
  }, []);

  // Prevent API calls from children when token is missing or auth not ready
  if (!isAuthReady) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User is authenticated but does not have the required role
    const ROLE_ROUTES = {
      admin: "/admin-dashboard",
      analyst: "/analyst-dashboard",
      trainer: "/trainer-dashboard",
      counsellor: "/counsellor-dashboard",
    };
    const fallbackRoute = ROLE_ROUTES[userRole] || "/login";
    return <Navigate to={fallbackRoute} replace />;
  }

  // User is fully authenticated and authorized
  return children;
};

export const PublicRoute = ({ children }) => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      let user = null;
      
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user = JSON.parse(storedUser);
        }
      } catch (e) {
        // ignore
      }

      if (token && user && typeof user.role === 'string') {
        setIsAuthenticated(true);
        setUserRole(user.role.toLowerCase());
      } else {
        setIsAuthenticated(false);
      }
      
      setIsAuthReady(true);
    };

    initializeAuth();
  }, []);

  if (!isAuthReady) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    const ROLE_ROUTES = {
      admin: "/admin-dashboard",
      analyst: "/analyst-dashboard",
      trainer: "/trainer-dashboard",
      counsellor: "/counsellor-dashboard",
    };
    const route = ROLE_ROUTES[userRole] || "/";
    return <Navigate to={route} replace />;
  }

  return children;
};
