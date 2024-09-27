import React from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import Unauthorized from './components/Unauthorized';

const userRole = 'user'; // This would be dynamically set, e.g., from authentication

// Define your routes
const router = createHashRouter([
  {
    path: '/',
    element: <NavbarComponent />,  // NavbarComponent as a parent layout
    children: [
      { path: 'home', element: <Home /> },  // Public route
      { path: 'unauthorized', element: <Unauthorized /> },  // Unauthorized route
      
      // Role-based route for 'admin'
      {
        path: 'admin',
        element: userRole === 'admin' ? <AdminPage /> : <Navigate to="/unauthorized" />
      },
      
      // Role-based route for 'user' or 'admin'
      {
        path: 'user',
        element: userRole === 'user' || userRole === 'admin' ? <UserPage /> : <Navigate to="/unauthorized" />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
