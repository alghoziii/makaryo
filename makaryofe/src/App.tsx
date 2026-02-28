import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyCartPage from "./pages/MyCartPage";
import DetailsPage from "./pages/DetailsPage";
import MyBookingPage from "./pages/MyBookingPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessBookingPage from "./pages/SuccesBookingPage";
import CategoryPage from "./pages/CategoryPage";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";

// Check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Public Route component (redirect to home if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes (auth pages) */}
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

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MyCartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success-booking"
          element={
            <ProtectedRoute>
              <SuccessBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-booking"
          element={
            <ProtectedRoute>
              <MyBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service/:slug"
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
