import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.error("Failed to parse user from local storage", e);
  }

  if (!token || !user) {
    // User is not authenticated
    return <Navigate to="/login" replace />;
  }

  const userRole = typeof user.role === 'string' ? user.role.toLowerCase() : '';

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
  const token = localStorage.getItem('token');
  let user = null;
  
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    // ignore
  }

  if (token && user && typeof user.role === 'string') {
    const ROLE_ROUTES = {
      admin: "/admin-dashboard",
      analyst: "/analyst-dashboard",
      trainer: "/trainer-dashboard",
      counsellor: "/counsellor-dashboard",
    };
    const route = ROLE_ROUTES[user.role.toLowerCase()] || "/";
    return <Navigate to={route} replace />;
  }

  return children;
};
