import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { UserProvider } from "./context/UserContext"
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Details from "./pages/Details";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from "./utils/localStorage";

const App = () => {
  const user = getCurrentUser();

  return (
    <UserProvider >
      <BrowserRouter>
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />

          <Route path="/" element={<AuthLayout />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/details/:id" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
